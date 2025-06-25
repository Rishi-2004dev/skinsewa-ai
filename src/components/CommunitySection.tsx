
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { MessageCircle, ThumbsUp, Share, Send, ChevronDown, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CommunityPost, PostComment } from "@/types/communityTypes";
import {
  fetchCommunityPosts,
  fetchComments,
  toggleLikePost,
  sharePost,
  addComment,
  voteInPoll,
  createNewTopic,
  getUserIdentifier,
  subscribeToPostChanges,
  subscribeToCommentChanges
} from "@/utils/communityUtils";

export function CommunitySection() {
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTopicOpen, setNewTopicOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [allComments, setAllComments] = useState<{[key: string]: PostComment[]}>({});
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(false);
  
  const [newTopicData, setNewTopicData] = useState({
    title: "",
    description: "",
    isPoll: false,
    pollType: "single" as "single" | "multiple",
    pollOptions: ["", ""]
  });
  
  const [userLiked, setUserLiked] = useState<{[key: string]: boolean}>({});
  const [userShared, setUserShared] = useState<{[key: string]: boolean}>({});
  const [userVoted, setUserVoted] = useState<{[key: string]: boolean}>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [processingAction, setProcessingAction] = useState<{[key: string]: boolean}>({});

  // Fetch initial community posts
  useEffect(() => {
    const loadCommunityPosts = async () => {
      try {
        setLoading(true);
        const { posts, userLiked: liked, userShared: shared, userVoted: voted } = await fetchCommunityPosts();
        
        setCommunityPosts(posts);
        setUserLiked(liked);
        setUserShared(shared);
        setUserVoted(voted);
      } catch (err) {
        console.error('Error loading community posts:', err);
        toast({
          title: "Error loading community posts",
          description: "There was a problem loading the community discussions.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadCommunityPosts();
    
    // Enable real-time updates for Supabase tables
    const channel = subscribeToPostChanges((updatedPost) => {
      setCommunityPosts(currentPosts => 
        currentPosts.map(post => 
          post.id === updatedPost.id ? updatedPost : post
        )
      );
      
      if (selectedPost?.id === updatedPost.id) {
        setSelectedPost(updatedPost);
      }
    });
    
    return () => {
      channel.unsubscribe();
    };
  }, []);

  const handlePostClick = async (post: CommunityPost) => {
    setSelectedPost(post);
    setDialogOpen(true);
    
    if (!allComments[post.id]) {
      await loadComments(post.id);
    }
    
    // Subscribe to comment updates for this post
    const commentChannel = subscribeToCommentChanges(post.id, (newComment) => {
      setAllComments(prev => ({
        ...prev,
        [post.id]: [...(prev[post.id] || []), newComment]
      }));
    });
    
    return () => {
      commentChannel.unsubscribe();
    };
  };
  
  const loadComments = async (postId: string) => {
    try {
      setCommentsLoading(true);
      const comments = await fetchComments(postId);
      
      setAllComments(prev => ({
        ...prev,
        [postId]: comments
      }));
    } catch (err) {
      console.error('Error loading comments:', err);
      toast({
        title: "Error loading comments",
        description: "There was a problem loading comments for this post.",
        variant: "destructive"
      });
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!commentText.trim()) return;
    
    try {
      const newComment = await addComment(postId, commentText, selectedPost?.comments || 0);
      
      // Update local state
      setAllComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), newComment]
      }));
      
      // Update comment count in posts list
      setCommunityPosts(posts => 
        posts.map(post => post.id === postId ? {...post, comments: (post.comments || 0) + 1} : post)
      );
      
      // Update comment count in selected post
      if (selectedPost?.id === postId) {
        setSelectedPost(prev => prev ? {...prev, comments: (prev.comments || 0) + 1} : null);
      }
      
      // Show success toast
      toast({
        title: "Comment added",
        description: "Your comment has been added to the discussion!",
      });
      
      // Clear input
      setCommentText("");
      
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Failed to add comment",
        description: "There was a problem adding your comment. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCreateTopic = async () => {
    if (!newTopicData.title.trim() || !newTopicData.description.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and description for your topic.",
        variant: "destructive"
      });
      return;
    }

    if (newTopicData.isPoll) {
      // Filter out empty poll options
      const validPollOptions = newTopicData.pollOptions.filter(option => option.trim() !== "");
      
      if (validPollOptions.length < 2) {
        toast({
          title: "Invalid poll",
          description: "Please provide at least two poll options.",
          variant: "destructive"
        });
        return;
      }
    }

    try {
      const newPost = await createNewTopic(
        newTopicData.title,
        newTopicData.description,
        newTopicData.isPoll,
        newTopicData.pollType,
        newTopicData.pollOptions
      );
      
      // Update local state
      setCommunityPosts(prev => [newPost, ...prev]);
      
      toast({
        title: "Topic created",
        description: "Your topic has been posted to the community!",
      });
      
      setNewTopicOpen(false);
      setNewTopicData({
        title: "",
        description: "",
        isPoll: false,
        pollType: "single",
        pollOptions: ["", ""]
      });
      
    } catch (error) {
      console.error('Error creating topic:', error);
      toast({
        title: "Failed to create topic",
        description: "There was a problem posting your topic. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleLikePost = async (postId: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    
    if (processingAction[`like-${postId}`]) return;
    setProcessingAction(prev => ({ ...prev, [`like-${postId}`]: true }));
    
    try {
      const isLiked = userLiked[postId];
      const post = communityPosts.find(p => p.id === postId);
      if (!post) return;
      
      await toggleLikePost(postId, isLiked, post.likes);
      
      // Update local state
      setUserLiked(prev => ({...prev, [postId]: !isLiked}));
      setCommunityPosts(posts => 
        posts.map(post => post.id === postId ? 
          {...post, likes: post.likes + (isLiked ? -1 : 1)} : post
        )
      );
      
      if (selectedPost?.id === postId) {
        setSelectedPost(prev => prev ? {
          ...prev,
          likes: prev.likes + (isLiked ? -1 : 1)
        } : null);
      }
      
      if (!isLiked) {
        toast({
          title: "Post liked",
          description: "You've liked this post!",
        });
      }
      
    } catch (error) {
      console.error('Error liking post:', error);
      toast({
        title: "Action failed",
        description: "There was a problem processing your action. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessingAction(prev => ({ ...prev, [`like-${postId}`]: false }));
    }
  };

  const handleSharePost = async (postId: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    
    if (processingAction[`share-${postId}`]) return;
    setProcessingAction(prev => ({ ...prev, [`share-${postId}`]: true }));
    
    try {
      const isShared = userShared[postId];
      const post = communityPosts.find(p => p.id === postId);
      if (!post) return;
      
      if (isShared) {
        toast({
          title: "Already shared",
          description: "You've already shared this post.",
        });
      } else {
        await sharePost(postId, isShared, post.shares);
        
        // Update local state
        setUserShared(prev => ({...prev, [postId]: true}));
        setCommunityPosts(posts => 
          posts.map(post => post.id === postId ? {...post, shares: post.shares + 1} : post)
        );
        
        if (selectedPost?.id === postId) {
          setSelectedPost(prev => prev ? {
            ...prev,
            shares: prev.shares + 1
          } : null);
        }
        
        toast({
          title: "Link copied",
          description: "Post link copied to clipboard!",
        });
      }
    } catch (error) {
      console.error('Error sharing post:', error);
      toast({
        title: "Action failed",
        description: "There was a problem processing your action. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessingAction(prev => ({ ...prev, [`share-${postId}`]: false }));
    }
  };

  const handleVote = async (postId: string) => {
    if (userVoted[postId]) {
      toast({
        title: "Already voted",
        description: "You've already voted in this poll.",
      });
      return;
    }
    
    const post = communityPosts.find(p => p.id === postId);
    if (!post?.is_poll || !post.poll_options) return;
    
    try {
      if (post.poll_type === "single" && selectedOption !== null) {
        const updatedPollOptions = await voteInPoll(postId, post, [selectedOption], true);
        
        // Update local state
        setCommunityPosts(posts => 
          posts.map(p => p.id === postId ? {...p, poll_options: updatedPollOptions} : p)
        );
        
        if (selectedPost?.id === postId) {
          setSelectedPost(prev => prev ? {...prev, poll_options: updatedPollOptions} : null);
        }
        
        setUserVoted(prev => ({...prev, [postId]: true}));
        toast({
          title: "Vote recorded",
          description: "Your vote has been counted!",
        });
        
      } else if (post.poll_type === "multiple" && selectedOptions.length > 0) {
        const updatedPollOptions = await voteInPoll(postId, post, selectedOptions, false);
        
        // Update local state
        setCommunityPosts(posts => 
          posts.map(p => p.id === postId ? {...p, poll_options: updatedPollOptions} : p)
        );
        
        if (selectedPost?.id === postId) {
          setSelectedPost(prev => prev ? {...prev, poll_options: updatedPollOptions} : null);
        }
        
        setUserVoted(prev => ({...prev, [postId]: true}));
        toast({
          title: "Votes recorded",
          description: "Your votes have been counted!",
        });
      } else {
        toast({
          title: "Please select an option",
          description: "You need to select at least one option to vote.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error voting in poll:', error);
      toast({
        title: "Action failed",
        description: "There was a problem processing your vote. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleAddPollOption = () => {
    setNewTopicData(prev => ({
      ...prev,
      pollOptions: [...prev.pollOptions, ""]
    }));
  };

  const handlePollOptionChange = (index: number, value: string) => {
    setNewTopicData(prev => {
      const newOptions = [...prev.pollOptions];
      newOptions[index] = value;
      return {...prev, pollOptions: newOptions};
    });
  };

  const handleRemovePollOption = (index: number) => {
    if (newTopicData.pollOptions.length <= 2) {
      toast({
        title: "Cannot remove option",
        description: "Polls must have at least two options.",
        variant: "destructive"
      });
      return;
    }
    
    setNewTopicData(prev => {
      const newOptions = [...prev.pollOptions];
      newOptions.splice(index, 1);
      return {...prev, pollOptions: newOptions};
    });
  };

  const handleCheckboxChange = (optionId: number) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  // The rest of the component JSX remains mostly the same
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-skinsewa-darkblue dark:text-white">
            Community Discussions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Connect with others facing similar skin conditions across India. Share your experiences and learn from community insights.
          </p>
          <Button 
            className="bg-skinsewa-pink hover:bg-skinsewa-pink/90 text-white"
            onClick={() => setNewTopicOpen(true)}
          >
            Start New Topic
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-skinsewa-blue" />
            <span className="ml-2 text-lg text-skinsewa-blue">Loading community posts...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityPosts.map((post) => (
              <Card key={post.id} className="cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={() => handlePostClick(post)}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar>
                      <AvatarImage src={post.author_image} />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">{post.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {typeof post.date === 'string' 
                          ? new Date(post.date).toLocaleDateString('en-IN') 
                          : post.date.toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{post.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs bg-skinsewa-blue/10 text-skinsewa-blue px-2 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {post.is_poll && post.poll_options && (
                    <div className="mt-3 text-sm text-muted-foreground">
                      <p className="font-medium">Poll · {post.poll_options.reduce((sum, opt) => sum + opt.votes, 0)} votes</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="flex items-center gap-4 text-muted-foreground text-xs">
                    <div 
                      className={`flex items-center gap-1 cursor-pointer ${userLiked[post.id] ? 'text-skinsewa-pink' : ''}`}
                      onClick={(e) => handleLikePost(post.id, e)}
                    >
                      {processingAction[`like-${post.id}`] ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <ThumbsUp className={`h-3 w-3 ${userLiked[post.id] ? 'fill-skinsewa-pink' : ''}`} />
                      )}
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{post.comments}</span>
                    </div>
                    <div 
                      className={`flex items-center gap-1 cursor-pointer ${userShared[post.id] ? 'text-skinsewa-blue' : ''}`}
                      onClick={(e) => handleSharePost(post.id, e)}
                    >
                      {processingAction[`share-${post.id}`] ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Share className={`h-3 w-3 ${userShared[post.id] ? 'text-skinsewa-blue' : ''}`} />
                      )}
                      <span>{post.shares}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Post dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedPost && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar>
                      <AvatarImage src={selectedPost.author_image} />
                      <AvatarFallback>{selectedPost.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-none">{selectedPost.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {typeof selectedPost.date === 'string' 
                          ? new Date(selectedPost.date).toLocaleDateString('en-IN') 
                          : selectedPost.date.toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={`px-2 ${userLiked[selectedPost.id] ? 'text-skinsewa-pink' : ''}`}
                        onClick={() => handleLikePost(selectedPost.id)}
                        disabled={processingAction[`like-${selectedPost.id}`]}
                      >
                        {processingAction[`like-${selectedPost.id}`] ? (
                          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                        ) : (
                          <ThumbsUp className={`h-4 w-4 mr-1 ${userLiked[selectedPost.id] ? 'fill-skinsewa-pink' : ''}`} />
                        )}
                        {selectedPost.likes}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`px-2 ${userShared[selectedPost.id] ? 'text-skinsewa-blue' : ''}`}
                            disabled={processingAction[`share-${selectedPost.id}`]}
                          >
                            {processingAction[`share-${selectedPost.id}`] ? (
                              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                            ) : (
                              <Share className="h-4 w-4 mr-1" />
                            )}
                            Share
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            handleSharePost(selectedPost.id);
                          }}>
                            Share to WhatsApp
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            handleSharePost(selectedPost.id);
                          }}>
                            Share to Facebook
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            handleSharePost(selectedPost.id);
                          }}>
                            Copy link
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <DialogTitle className="text-xl">{selectedPost.title}</DialogTitle>
                  <DialogDescription className="text-base py-2">{selectedPost.description}</DialogDescription>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedPost.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs bg-skinsewa-blue/10 text-skinsewa-blue px-2 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </DialogHeader>

                {/* Poll content if it's a poll */}
                {selectedPost.is_poll && selectedPost.poll_options && (
                  <div className="my-4 border rounded-lg p-4">
                    <h3 className="font-medium mb-3">Poll: {selectedPost.poll_type === "single" ? "Select one option" : "Select multiple options"}</h3>
                    
                    {selectedPost.poll_type === "single" ? (
                      <RadioGroup 
                        value={selectedOption?.toString() || ""} 
                        onValueChange={(value) => setSelectedOption(parseInt(value))}
                        className="space-y-3"
                        disabled={userVoted[selectedPost.id]}
                      >
                        {selectedPost.poll_options.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <RadioGroupItem 
                              value={option.id.toString()}
                              id={`option-${option.id}`}
                              disabled={userVoted[selectedPost.id]}
                            />
                            <Label htmlFor={`option-${option.id}`} className="flex-1">{option.text}</Label>
                            <span className="text-sm text-muted-foreground">{option.votes} votes</span>
                          </div>
                        ))}
                      </RadioGroup>
                    ) : (
                      <div className="space-y-3">
                        {selectedPost.poll_options.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`option-${option.id}`} 
                              checked={selectedOptions.includes(option.id)}
                              onCheckedChange={() => handleCheckboxChange(option.id)}
                              disabled={userVoted[selectedPost.id]}
                            />
                            <Label htmlFor={`option-${option.id}`} className="flex-1">{option.text}</Label>
                            <span className="text-sm text-muted-foreground">{option.votes} votes</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {!userVoted[selectedPost.id] && (
                      <Button 
                        className="mt-4 bg-skinsewa-pink hover:bg-skinsewa-pink/90"
                        onClick={() => handleVote(selectedPost.id)}
                      >
                        Submit Vote
                      </Button>
                    )}
                  </div>
                )}

                <div className="mt-4 border-t pt-4">
                  <h4 className="font-medium mb-4">Comments</h4>
                  {commentsLoading ? (
                    <div className="flex justify-center items-center py-6">
                      <Loader2 className="h-6 w-6 animate-spin text-skinsewa-blue" />
                      <span className="ml-2">Loading comments...</span>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[30vh] overflow-y-auto">
                      {allComments[selectedPost.id]?.map((comment: PostComment) => (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.author_image} />
                            <AvatarFallback>{comment.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium">{comment.author}</p>
                              <p className="text-xs text-muted-foreground">
                                {typeof comment.date === 'string' 
                                  ? new Date(comment.date).toLocaleDateString('en-IN') 
                                  : comment.date.toLocaleDateString('en-IN')}
                              </p>
                            </div>
                            <p className="text-sm mt-1">{comment.text}</p>
                          </div>
                        </div>
                      ))}
                      {allComments[selectedPost.id]?.length === 0 && (
                        <p className="text-sm text-muted-foreground">No comments yet. Be the first to comment!</p>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2 mt-6">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${getUserIdentifier()}`} />
                      <AvatarFallback>Y</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex">
                      <Input
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add your comment..."
                        className="flex-1 rounded-r-none"
                      />
                      <Button 
                        onClick={() => handleAddComment(selectedPost.id)}
                        size="sm"
                        className="rounded-l-none bg-skinsewa-blue"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* New topic dialog */}
        <Dialog open={newTopicOpen} onOpenChange={setNewTopicOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Start a New Topic</DialogTitle>
              <DialogDescription>
                Create a discussion topic to share with the community.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="topic-title">Title</Label>
                <Input
                  id="topic-title"
                  placeholder="Topic title"
                  value={newTopicData.title}
                  onChange={(e) => setNewTopicData({ ...newTopicData, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="topic-description">Description</Label>
                <Textarea
                  id="topic-description"
                  placeholder="Describe your topic or question in detail..."
                  className="h-32"
                  value={newTopicData.description}
                  onChange={(e) => setNewTopicData({ ...newTopicData, description: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="is-poll"
                  checked={newTopicData.isPoll}
                  onCheckedChange={(checked) => setNewTopicData({ 
                    ...newTopicData, 
                    isPoll: checked as boolean 
                  })}
                />
                <Label htmlFor="is-poll">Create as poll</Label>
              </div>
              
              {newTopicData.isPoll && (
                <>
                  <div className="flex items-center space-x-4">
                    <Label>Poll type:</Label>
                    <RadioGroup 
                      defaultValue="single" 
                      value={newTopicData.pollType}
                      onValueChange={(value) => setNewTopicData({
                        ...newTopicData,
                        pollType: value as "single" | "multiple"
                      })}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="single" id="single" />
                        <Label htmlFor="single">Single choice</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="multiple" id="multiple" />
                        <Label htmlFor="multiple">Multiple choice</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Poll options:</Label>
                    {newTopicData.pollOptions.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <Input
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => handlePollOptionChange(index, e.target.value)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemovePollOption(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddPollOption}
                      className="mt-2"
                    >
                      Add Option
                    </Button>
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewTopicOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateTopic} className="bg-skinsewa-pink hover:bg-skinsewa-pink/90">
                Post Topic
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
