
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export function BlogTrends() {
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  // Fetch blog posts from Supabase
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('date', { ascending: false });
          
        if (error) {
          console.error('Error fetching blogs:', error);
          toast({
            title: "Error fetching blog posts",
            description: "There was a problem loading the latest health trends.",
            variant: "destructive"
          });
          return;
        }
        
        setBlogPosts(data || []);
      } catch (err) {
        console.error('Error in blog fetch operation:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPosts();
  }, []);

  const handleClick = (blog: any) => {
    setSelectedBlog(blog);
    setDialogOpen(true);
  };

  const handleOpenOriginal = (url: string) => {
    if (url) {
      // Open in new tab
      window.open(url, '_blank');
    } else {
      toast({
        title: "Link not available",
        description: "The original source for this article is not currently available.",
      });
    }
  };

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-skinsewa-darkblue dark:text-white">
          Latest Health Trends
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
          Stay informed with the latest developments in dermatology and skin health from trusted Indian medical sources.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-skinsewa-blue" />
          <span className="ml-2 text-lg text-skinsewa-blue">Loading blog posts...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((blog) => (
            <Card 
              key={blog.id} 
              className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
              onClick={() => handleClick(blog)}
            >
              <div className="relative h-48">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-skinsewa-pink text-white">
                  {blog.category}
                </Badge>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-muted-foreground">
                    {new Date(blog.date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                  <span className="text-xs text-muted-foreground">•</span>
                  <p className="text-xs text-muted-foreground">{blog.reading_time} read</p>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <CardDescription className="line-clamp-3">
                  {blog.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="pt-0 pb-4 flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={blog.author_image} />
                  <AvatarFallback>{blog.author_name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-medium">{blog.author_name}</p>
                  <p className="text-xs text-muted-foreground">{blog.author_title}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Blog dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedBlog && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <Badge className="bg-skinsewa-pink text-white">
                    {selectedBlog.category}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">
                      {new Date(selectedBlog.date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    <span className="text-xs text-muted-foreground">•</span>
                    <p className="text-xs text-muted-foreground">{selectedBlog.reading_time} read</p>
                  </div>
                </div>
                <DialogTitle className="text-2xl mt-2">{selectedBlog.title}</DialogTitle>
                <div className="flex items-center gap-2 mt-4">
                  <Avatar>
                    <AvatarImage src={selectedBlog.author_image} />
                    <AvatarFallback>{selectedBlog.author_name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{selectedBlog.author_name}</p>
                    <p className="text-xs text-muted-foreground">{selectedBlog.author_title}</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="py-4">
                <img 
                  src={selectedBlog.image} 
                  alt={selectedBlog.title} 
                  className="w-full h-48 object-cover rounded-md mb-6"
                />
                <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: selectedBlog.full_content }}></div>

                <div className="flex flex-wrap gap-2 mt-6">
                  {selectedBlog.tags && selectedBlog.tags.map((tag: string, idx: number) => (
                    <span key={idx} className="text-xs bg-skinsewa-blue/10 text-skinsewa-blue px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <Button 
                    onClick={() => handleOpenOriginal(selectedBlog.url)}
                    className="bg-skinsewa-blue hover:bg-skinsewa-blue/90"
                  >
                    Read Full Article on Source Website
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
