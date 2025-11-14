// app/news/[slug]/page.tsx
import { notFound } from "next/navigation";
import { NewsArticle } from "@/components/news/NewsArticle";
import { RelatedStories } from "@/components/news/RelatedStories";
import { Newsletter } from "@/components/news/Newsletter";

// Mock data - In production, this would come from a CMS or database
const newsArticles = [
  {
    id: "1",
    slug: "empowering-500-youth-our-largest-vocational-training-program-yet",
    title: "Empowering 500+ Youth: Our Largest Vocational Training Program Yet",
    excerpt:
      "This year, we successfully trained over 500 young people in sustainable vocational skills, creating new economic opportunities in underserved communities.",
    content: `
      <p>In a remarkable achievement for community development, OKARANIME HERITAGE FOUNDATION has successfully completed its largest vocational training program to date, empowering more than 500 youth across multiple states in Nigeria. This intensive program, which ran for six months, focused on equipping young people with practical skills that lead to sustainable livelihoods.</p>

      <h2>Program Overview</h2>
      <p>The vocational training program was designed to address the critical need for employable skills among youth in underserved communities. Participants aged 18-25 received comprehensive training in various trades including:</p>
      
      <ul>
        <li>Solar panel installation and maintenance</li>
        <li>Digital marketing and e-commerce</li>
        <li>Fashion design and tailoring</li>
        <li>Agricultural entrepreneurship</li>
        <li>Mobile phone repair</li>
      </ul>

      <h2>Impact and Outcomes</h2>
      <p>The program has yielded impressive results, with 85% of graduates either starting their own businesses or securing employment within three months of completion. One notable success story is that of Chinedu Okoro, a 22-year-old from Enugu State who started a solar installation company that now employs three other youth from his community.</p>

      <blockquote>
        "This training changed my life. I went from having no direction to running a business that serves my community and provides jobs for others," said Chinedu.
      </blockquote>

      <h2>Sustainable Approach</h2>
      <p>What sets this program apart is its focus on sustainability. Each training module incorporated environmental awareness and business management skills, ensuring that graduates not only master their trades but also understand how to build sustainable enterprises.</p>

      <h2>Future Expansion</h2>
      <p>Building on this success, we plan to expand the program to three additional states in the coming year, with a goal of training 1,000 youth annually by 2026. This expansion is made possible through partnerships with local governments and corporate sponsors who recognize the importance of youth empowerment in community development.</p>

      <p>The success of this program demonstrates that with the right training and support, young people in underserved communities can become drivers of economic growth and positive change in their localities.</p>
    `,
    image: "/news/youth-training.jpg",
    category: "Youth Empowerment",
    author: {
      name: "Sarah Johnson",
      role: "Program Director",
      avatar: "/team/sarah-johnson.jpg",
    },
    date: "December 15, 2024",
    readTime: "5 min read",
    views: 1250,
    likes: 245,
    tags: [
      "Youth Empowerment",
      "Vocational Training",
      "Skills Development",
      "Economic Opportunity",
    ],
    featured: true,
    relatedStories: ["2", "3", "6"],
  },
  {
    id: "2",
    slug: "breaking-barriers-how-handicapped-women-are-building-successful-businesses",
    title:
      "Breaking Barriers: How Handicapped Women Are Building Successful Businesses",
    excerpt:
      "Meet the women who are overcoming physical challenges to become successful entrepreneurs through our empowerment programs.",
    content: `
      <p>In a powerful demonstration of resilience and determination, handicapped women across Nigeria are breaking through societal barriers to establish successful businesses through OKARANIME HERITAGE FOUNDATION's Women's Empowerment Program.</p>

      <h2>Transforming Lives Through Entrepreneurship</h2>
      <p>The program, specifically designed for women with physical disabilities, provides comprehensive training in business skills, access to seed funding, and ongoing mentorship. Over the past year, 75 women have graduated from the program, with 68 successfully launching their own enterprises.</p>

      <h2>Success Stories</h2>
      <p>One of the program's standout success stories is Amina Yusuf, a wheelchair user from Kano State. Despite facing significant mobility challenges, Amina has built a thriving fashion business that employs four other women from her community.</p>

      <blockquote>
        "People used to see my wheelchair as a limitation. Now they see the successful business I've built. This program showed me that disability doesn't define my capabilities," Amina shared.
      </blockquote>

      <h2>Program Components</h2>
      <p>The empowerment program includes:</p>
      <ul>
        <li>Six months of intensive business training</li>
        <li>Access to interest-free startup loans</li>
        <li>Mentorship from successful women entrepreneurs</li>
        <li>Adaptive workspace solutions</li>
        <li>Market access and networking opportunities</li>
      </ul>

      <h2>Measuring Impact</h2>
      <p>The program's impact extends beyond individual success stories. On average, graduates have seen a 150% increase in household income, and 92% report improved self-confidence and social standing in their communities.</p>

      <h2>Future Vision</h2>
      <p>We are committed to expanding this program to reach 500 handicapped women across Nigeria by 2026. With additional funding and partnerships, we aim to create even more opportunities for women who have traditionally been excluded from economic participation.</p>
    `,
    image: "/news/women-empowerment.jpg",
    category: "Women's Empowerment",
    author: {
      name: "Michael Brown",
      role: "Women's Empowerment Lead",
      avatar: "/team/michael-brown.jpg",
    },
    date: "December 10, 2024",
    readTime: "4 min read",
    views: 980,
    likes: 187,
    tags: [
      "Women's Empowerment",
      "Entrepreneurship",
      "Disability Inclusion",
      "Business",
    ],
    featured: true,
    relatedStories: ["1", "4", "8"],
  },
  // Add more articles as needed...
];

// Server component that uses params prop
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsArticlePage({ params }: PageProps) {
  // Await the params promise
  const { slug } = await params;

  const article = newsArticles.find((article) => article.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className='min-h-screen'>
      <NewsArticle article={article} />
      <RelatedStories currentArticle={article} allArticles={newsArticles} />
      <Newsletter />
    </div>
  );
}

// Generate metadata
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = newsArticles.find((article) => article.slug === slug);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${article.title} | OKARANIME HERITAGE FOUNDATION`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author.name],
    },
  };
}

// Generate static params for SSG
export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}
