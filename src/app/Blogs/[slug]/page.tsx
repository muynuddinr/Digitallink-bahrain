// app/blogs/[slug]/page.tsx
'use client';

import { memo, useEffect, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogBySlug, getRelatedBlogs } from '@/lib/blogData';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import ScrollToTop from '../../components/ScrollToTop';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface ContentElement {
  type: 'h3' | 'p';
  content: string;
  index: number;
}

interface SocialShare {
  href: string;
  color: string;
  icon: string;
}

// Memoized components
const BackgroundAnimation = memo(() => (
  <>
    <motion.div 
      className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full transform translate-x-1/3 -translate-y-1/3"
      animate={{
        scale: [1, 1.1, 1],
        x: [0, 20, 0],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div 
      className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full transform -translate-x-1/4 translate-y-1/4"
      animate={{
        scale: [1, 1.2, 1],
        x: [0, -15, 0],
        y: [0, 15, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div 
      className="absolute top-1/2 left-1/4 w-32 h-32 bg-white opacity-5 rounded-full"
      animate={{
        scale: [1, 1.15, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </>
));

BackgroundAnimation.displayName = 'BackgroundAnimation';

const DecorativeElements = memo(() => (
  <>
    <motion.div 
      className="absolute top-10 left-10 w-16 h-16 border-t-2 border-l-2 border-white opacity-20"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.2, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    />
    <motion.div 
      className="absolute bottom-10 right-10 w-16 h-16 border-b-2 border-r-2 border-white opacity-20"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.2, scale: 1 }}
      transition={{ duration: 1, delay: 0.4 }}
    />
  </>
));

DecorativeElements.displayName = 'DecorativeElements';

const MetaInfoItem = memo(({ 
  children, 
  delay 
}: { 
  children: React.ReactNode; 
  delay: number;
}) => (
  <motion.div 
    className="flex items-center gap-2"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
));

MetaInfoItem.displayName = 'MetaInfoItem';

const SocialShareButton = memo(({ 
  social, 
  index 
}: { 
  social: SocialShare; 
  index: number;
}) => (
  <motion.a
    href={social.href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:text-white rounded-full transition-colors"
    style={{ ['--hover-bg' as any]: social.color }}
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    whileHover={{ scale: 1.1, backgroundColor: social.color }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={social.icon} />
    </svg>
  </motion.a>
));

SocialShareButton.displayName = 'SocialShareButton';

const RelatedBlogCard = memo(({ 
  blog, 
  index 
}: { 
  blog: any; 
  index: number;
}) => (
  <motion.div
    key={blog.slug}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
  >
    <Link 
      href={`/blogs/${blog.slug}`} 
      className="flex gap-4 group"
      prefetch={false}
    >
      <div className="flex-shrink-0">
        <Image
          src={blog.cardImage}
          alt={blog.title}
          className="w-20 h-20 object-cover rounded-lg"
          width={80}
          height={80}
          placeholder="blur"
        />
      </div>
      <div>
        <h4 className="text-base font-medium text-gray-900 group-hover:text-blue-500 transition-colors leading-tight">
          {blog.title}
        </h4>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {blog.intro}
        </p>
      </div>
    </Link>
  </motion.div>
));

RelatedBlogCard.displayName = 'RelatedBlogCard';

const ContentElement = memo(({ 
  element, 
  index,
  contentElements 
}: { 
  element: ContentElement; 
  index: number;
  contentElements: ContentElement[];
}) => {
  if (element.type === 'h3') {
    return (
      <motion.h3 
        key={element.index}
        className="text-xl font-semibold italic text-gray-800 mt-8 mb-4 first:mt-0"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        {element.content}
      </motion.h3>
    );
  } else {
    const nextH3Index = contentElements.findIndex((el, i) => i > index && el.type === 'h3');
    const isLastBeforeH3 = nextH3Index !== -1 && index === nextH3Index - 1;
    
    return (
      <motion.p 
        key={element.index}
        className="mb-4 italic"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ 
          duration: 0.6, 
          delay: isLastBeforeH3 ? 0.2 : 0.1 
        }}
      >
        {element.content}
      </motion.p>
    );
  }
});

ContentElement.displayName = 'ContentElement';

export default function BlogSlugPage({ params }: BlogPageProps) {
  const [slug, setSlug] = useState<string>('');
  const [entry, setEntry] = useState<any>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  // Memoized social share data
  const socialShares = useMemo<SocialShare[]>(() => [
    { 
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(entry?.title || '')}`, 
      color: '#1DA1F2', 
      icon: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' 
    },
    { 
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`, 
      color: '#1877F2', 
      icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' 
    },
    { 
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&title=${encodeURIComponent(entry?.title || '')}`, 
      color: '#0A66C2', 
      icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z' 
    },
    { 
      href: `mailto:?subject=${encodeURIComponent(entry?.title || '')}&body=Check%20out%20this%20article`, 
      color: '#1f2937', 
      icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6' 
    }
  ], [entry?.title]);

  // Scroll to top effect
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  // Load blog data
  useEffect(() => {
    const loadData = async () => {
      const resolvedParams = await params;
      const currentSlug = resolvedParams.slug;
      setSlug(currentSlug);
      
      const blogEntry = getBlogBySlug(currentSlug);
      
      if (!blogEntry) {
        notFound();
      }

      setEntry(blogEntry);
      setRelatedBlogs(getRelatedBlogs(currentSlug, 3));
      
      const date = blogEntry.publishDate
        ? new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(blogEntry.publishDate)
        : null;
      
      setFormattedDate(date);
    };
    
    loadData();
  }, [params]);

  // Parse content function
  const parseContent = useCallback((content: string): ContentElement[] => {
    const elements: ContentElement[] = [];
    let elementIndex = 0;
    
    content.split('\n').forEach((paragraph: string) => {
      if (paragraph.trim().startsWith('<h3>')) {
        const headingText = paragraph.replace(/<h3>|<\/h3>/g, '').trim();
        if (headingText) {
          elements.push({ type: 'h3', content: headingText, index: elementIndex++ });
        }
      } else if (paragraph.trim().startsWith('<p>')) {
        const paragraphText = paragraph.replace(/<p>|<\/p>/g, '').trim();
        if (paragraphText) {
          elements.push({ type: 'p', content: paragraphText, index: elementIndex++ });
        }
      } else if (paragraph.trim() !== '') {
        elements.push({ type: 'p', content: paragraph.trim(), index: elementIndex++ });
      }
    });
    
    return elements;
  }, []);

  // Memoized content elements
  const contentElements = useMemo(() => 
    entry?.fullContent ? parseContent(entry.fullContent) : [], 
    [entry?.fullContent, parseContent]
  );

  if (!entry) {
    return null;
  }

  return (
    <>
      <ScrollToTop />
      <section className="relative py-24 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 z-0" />

        <BackgroundAnimation />
        <DecorativeElements />

        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-24 text-white">
              Insights & <span className="relative inline-block">
                <span className="relative z-10">Perspectives</span>
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-3 bg-cyan-400 opacity-70 rounded"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-1 bg-cyan-400 opacity-30 blur-sm"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </span>
            </h1>
          </motion.div>
        </div>

        <div className="absolute inset-0 z-20 flex items-end justify-center">
          <motion.div 
            className="container max-w-6xl mx-auto px-6 pb-16 pt-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row md:flex-wrap items-center gap-4 text-white/80">
              {formattedDate && (
                <MetaInfoItem delay={0.5}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>{formattedDate}</span>
                </MetaInfoItem>
              )}

              {entry.readingTime && (
                <MetaInfoItem delay={0.6}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{entry.readingTime} min read</span>
                </MetaInfoItem>
              )}

              {entry.author && (
                <MetaInfoItem delay={0.7}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>{entry.author}</span>
                </MetaInfoItem>
              )}
            </div>
          </motion.div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-full h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.92,146.86,136.44,221.91,119.3,302.86,101.1,272,68,321.39,56.44Z"
              fill="#ffffff"
              fillOpacity="0.1"
            />
          </svg>
        </div>
      </section>

      {/* Breadcrumb */}
      <motion.nav 
        className="bg-gray-50 py-3 border-b border-gray-100" 
        aria-label="Breadcrumb"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container max-w-6xl mx-auto px-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-blue-500" prefetch={false}>Home</Link></li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-1"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </li>
            <li><Link href="/blogs" className="hover:text-blue-500" prefetch={false}>Blogs</Link></li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-1"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </li>
            <li
              className="text-blue-500 font-medium truncate max-w-[200px] md:max-w-xs"
              aria-current="page"
            >
              {entry.title}
            </li>
          </ol>
        </div>
      </motion.nav>

      {/* Main Content */}
      <article className="py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 max-w-3xl leading-tight border-l-4 border-blue-500 pl-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {entry.title}
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {entry.description && (
                <motion.div 
                  className="mb-8 text-xl text-gray-700 leading-relaxed font-light italic text-justify"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {entry.description}
                </motion.div>
              )}

              {/* Full Content */}
              {contentElements.length > 0 && (
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-justify">
                  {contentElements.map((element, index) => (
                    <ContentElement 
                      key={element.index}
                      element={element}
                      index={index}
                      contentElements={contentElements}
                    />
                  ))}
                </div>
              )}

              {/* Share buttons */}
              <motion.div 
                className="mt-10 pt-8 border-t border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Share this article
                </h3>
                <div className="flex gap-3">
                  {socialShares.map((social, index) => (
                    <SocialShareButton 
                      key={index}
                      social={social}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <motion.div 
                className="border border-gray-200 rounded-xl p-6 bg-gray-50"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Related Articles
                </h3>
                <div className="space-y-6">
                  {relatedBlogs.map((blog, index) => (
                    <RelatedBlogCard 
                      key={blog.slug}
                      blog={blog}
                      index={index}
                    />
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Link
                    href="/blogs"
                    className="mt-6 inline-flex items-center gap-2 text-blue-500 font-medium hover:underline"
                    prefetch={false}
                  >
                    View all blogs
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>
            </aside>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container max-w-6xl mx-auto px-6 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Want to learn more about our solutions?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Discover how Hikvision security systems can help safeguard your business.
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-lg transition-colors inline-block shadow-lg shadow-blue-500/50"
                prefetch={false}
              >
                Contact Us
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/productsnew"
                className="px-8 py-3 bg-white border border-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-colors inline-block"
                prefetch={false}
              >
                Explore Products
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Next/Prev Article Navigation */}
      <motion.section 
        className="border-t border-gray-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/blogs" className="group py-8 px-6 flex items-center gap-4" prefetch={false}>
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-blue-500 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-600 group-hover:text-white transition-colors"
                  >
                    <path d="M19 12H5" />
                    <path d="M12 19l-7-7 7-7" />
                  </svg>
                </div>
                <div>
                  <span className="block text-sm text-gray-500">Back to</span>
                  <span className="font-medium text-gray-900 group-hover:text-blue-500 transition-colors">
                    All Blogs
                  </span>
                </div>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/contact"
                className="group py-8 px-6 flex items-center justify-end gap-4"
                prefetch={false}
              >
                <div>
                  <span className="block text-sm text-gray-500 text-right">
                    Any questions?
                  </span>
                  <span className="font-medium text-gray-900 group-hover:text-blue-500 transition-colors">
                    Contact Us
                  </span>
                </div>
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-blue-500 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-600 group-hover:text-white transition-colors"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
}