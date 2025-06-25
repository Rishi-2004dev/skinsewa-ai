
import { supabase } from "@/integrations/supabase/client";
import { CommunityPost, PostComment, PollOption } from "@/types/communityTypes";
import { v4 as uuidv4 } from 'uuid';

// Generate a unique user identifier for this session if not exists
export const getUserIdentifier = () => {
  let userId = localStorage.getItem('community_user_id');
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem('community_user_id', userId);
  }
  return userId;
};

// Fetch community posts from Supabase
export const fetchCommunityPosts = async (): Promise<{
  posts: CommunityPost[],
  userLiked: Record<string, boolean>,
  userShared: Record<string, boolean>,
  userVoted: Record<string, boolean>
}> => {
  try {
    const { data: postsData, error } = await supabase
      .from('community_posts')
      .select('*')
      .order('date', { ascending: false });
      
    if (error) {
      throw error;
    }
    
    // Process posts data to ensure proper types
    const posts = postsData.map(post => ({
      ...post,
      tags: post.tags || [],
      poll_options: post.poll_options ? formatPollOptions(post.poll_options) : [],
      poll_type: post.poll_type as "single" | "multiple" | null
    }));
    
    // Check for user likes and shares
    const userId = getUserIdentifier();
    
    // Fetch likes
    const { data: likes, error: likesError } = await supabase
      .from('post_likes')
      .select('post_id')
      .eq('user_identifier', userId);
      
    const userLiked: Record<string, boolean> = {};
    if (!likesError && likes) {
      likes.forEach(like => {
        userLiked[like.post_id] = true;
      });
    }
    
    // Fetch shares
    const { data: shares, error: sharesError } = await supabase
      .from('post_shares')
      .select('post_id')
      .eq('user_identifier', userId);
      
    const userShared: Record<string, boolean> = {};
    if (!sharesError && shares) {
      shares.forEach(share => {
        userShared[share.post_id] = true;
      });
    }
    
    // Fetch votes
    const { data: votes, error: votesError } = await supabase
      .from('poll_votes')
      .select('post_id')
      .eq('user_identifier', userId);
      
    const userVoted: Record<string, boolean> = {};
    if (!votesError && votes) {
      votes.forEach(vote => {
        userVoted[vote.post_id] = true;
      });
    }
    
    return { posts, userLiked, userShared, userVoted };
  } catch (err) {
    console.error('Error in community posts fetch operation:', err);
    throw err;
  }
};

// Fetch comments for a post
export const fetchComments = async (postId: string): Promise<PostComment[]> => {
  try {
    const { data, error } = await supabase
      .from('post_comments')
      .select('*')
      .eq('post_id', postId)
      .order('date', { ascending: true });
      
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (err) {
    console.error('Error in comments fetch operation:', err);
    throw err;
  }
};

// Like or unlike a post
export const toggleLikePost = async (
  postId: string, 
  isLiked: boolean,
  currentLikes: number
): Promise<void> => {
  const userId = getUserIdentifier();
  
  if (isLiked) {
    // Unlike post
    await supabase
      .from('post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_identifier', userId);
      
    // Update like count in post
    await supabase
      .from('community_posts')
      .update({ likes: currentLikes - 1 })
      .eq('id', postId);
  } else {
    // Like post
    await supabase
      .from('post_likes')
      .insert({
        post_id: postId,
        user_identifier: userId
      });
      
    // Update like count in post
    await supabase
      .from('community_posts')
      .update({ likes: currentLikes + 1 })
      .eq('id', postId);
  }
};

// Share a post
export const sharePost = async (
  postId: string, 
  isShared: boolean,
  currentShares: number
): Promise<void> => {
  if (isShared) {
    return; // Already shared
  }

  const userId = getUserIdentifier();
  
  // Record share action
  await supabase
    .from('post_shares')
    .insert({
      post_id: postId,
      user_identifier: userId
    });
    
  // Update share count in post
  await supabase
    .from('community_posts')
    .update({ shares: currentShares + 1 })
    .eq('id', postId);
    
  // Copy the post URL (in a real app, this would be a shareable link)
  await navigator.clipboard.writeText(`${window.location.origin}/community/post/${postId}`);
};

// Add a comment to a post
export const addComment = async (
  postId: string,
  commentText: string,
  currentComments: number
): Promise<PostComment> => {
  const userId = getUserIdentifier();
  
  // Add comment to database
  const { data, error } = await supabase
    .from('post_comments')
    .insert({
      post_id: postId,
      author: 'You',
      author_image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
      text: commentText,
      date: new Date().toISOString()
    })
    .select();
    
  if (error) {
    throw error;
  }
  
  // Update comment count in post
  await supabase
    .from('community_posts')
    .update({ comments: currentComments + 1 })
    .eq('id', postId);
    
  return data[0];
};

// Vote in a poll
export const voteInPoll = async (
  postId: string,
  post: CommunityPost,
  selectedOptions: number[],
  isPollSingle: boolean
): Promise<PollOption[]> => {
  const userId = getUserIdentifier();
  
  if (!post.poll_options) return [];
  
  const options = post.poll_options;
  
  // Submit votes to database
  const votesData = selectedOptions.map(optionId => ({
    post_id: postId,
    option_id: optionId,
    user_identifier: userId
  }));
  
  await supabase
    .from('poll_votes')
    .insert(isPollSingle ? votesData[0] : votesData);
    
  // Update vote counts in poll options
  const updatedOptions = options.map(opt => 
    selectedOptions.includes(opt.id) ? {...opt, votes: opt.votes + 1} : opt
  );
  
  // Update poll options in database
  await supabase
    .from('community_posts')
    .update({
      poll_options: updatedOptions
    })
    .eq('id', postId);
    
  return updatedOptions;
};

// Create a new topic
export const createNewTopic = async (
  title: string,
  description: string,
  isPoll: boolean,
  pollType: "single" | "multiple",
  pollOptions: string[]
): Promise<CommunityPost> => {
  const userId = getUserIdentifier();
  
  // Format poll options if it's a poll
  let formattedPollOptions = null;
  if (isPoll) {
    formattedPollOptions = pollOptions
      .filter(option => option.trim() !== "")
      .map((text, index) => ({ id: index + 1, text, votes: 0 }));
  }
  
  // Create new post in database
  const { data, error } = await supabase
    .from('community_posts')
    .insert({
      title,
      description,
      author: 'You',
      author_image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
      likes: 0,
      comments: 0,
      shares: 0,
      tags: ['New', 'Discussion'],
      is_poll: isPoll,
      poll_type: isPoll ? pollType : null,
      poll_options: isPoll ? formattedPollOptions : []
    })
    .select();
    
  if (error) {
    throw error;
  }
  
  // Format the returned data
  const post = data[0];
  return {
    ...post,
    poll_options: post.poll_options ? formatPollOptions(post.poll_options) : [],
    poll_type: post.poll_type as "single" | "multiple" | null
  };
};

// Helper function to format poll options from the database
const formatPollOptions = (pollOptionsData: any): PollOption[] => {
  if (!pollOptionsData) return [];
  
  if (Array.isArray(pollOptionsData)) {
    return pollOptionsData.map(option => ({
      id: option.id,
      text: option.text,
      votes: option.votes || 0
    }));
  }
  
  return [];
};

// Set up real-time subscription for community posts
export const subscribeToPostChanges = (callback: (post: CommunityPost) => void) => {
  const channel = supabase
    .channel('public:community_posts')
    .on('postgres_changes', 
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'community_posts'
      },
      (payload) => {
        const updatedPost = payload.new as any;
        callback({
          ...updatedPost,
          tags: updatedPost.tags || [],
          poll_options: updatedPost.poll_options ? formatPollOptions(updatedPost.poll_options) : [],
          poll_type: updatedPost.poll_type as "single" | "multiple" | null
        });
      }
    )
    .subscribe();
    
  return channel;
};

// Set up real-time subscription for comments
export const subscribeToCommentChanges = (postId: string, callback: (comment: PostComment) => void) => {
  const channel = supabase
    .channel('public:post_comments')
    .on('postgres_changes', 
      {
        event: 'INSERT',
        schema: 'public',
        table: 'post_comments',
        filter: `post_id=eq.${postId}`
      },
      (payload) => {
        callback(payload.new as PostComment);
      }
    )
    .subscribe();
    
  return channel;
};
