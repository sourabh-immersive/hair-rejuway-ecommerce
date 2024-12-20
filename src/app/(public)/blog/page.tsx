import React from "react";
import SectionLatestPosts from "./SectionLatestPosts";

const BlogPage: React.FC = () => {
  return (
    <div className="nc-BlogPage overflow-hidden relative">
      <div className="container relative">
        <SectionLatestPosts className="py-10 lg:py-10" />
      </div>
    </div>
  );
};

export default BlogPage;
