// data/newsData.ts
export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  image: string;
  date: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: "article-1",
    slug: "sustainable-agriculture-program-enugu",
    title: "New Sustainable Agriculture Program Launches in Enugu State",
    image: "/news/agriculture.jpg",
    date: "Nov 28, 2024",
    content: `
      <p>We are excited to announce the launch of our new Sustainable Agriculture Program in Enugu State, aimed at empowering youth with modern farming techniques and sustainable agricultural practices.</p>
      
      <h2>Program Overview</h2>
      <p>This comprehensive program focuses on training young individuals in various aspects of modern agriculture, including:</p>
      <ul>
        <li>Organic farming techniques</li>
        <li>Crop rotation and soil management</li>
        <li>Water conservation methods</li>
        <li>Modern irrigation systems</li>
        <li>Agricultural business management</li>
      </ul>

      <h2>Impact and Goals</h2>
      <p>Our goal is to train over 500 youth in the first year, providing them with the skills needed to start their own agricultural enterprises or secure employment in the agricultural sector.</p>

      <p>The program also includes mentorship opportunities and access to startup resources for participants who wish to launch their own farming businesses.</p>
    `,
    metaTitle: "Sustainable Agriculture Program Launch - OKARANIME Foundation",
    metaDescription:
      "Learn about our new Sustainable Agriculture Program in Enugu State, training youth in modern farming techniques and sustainable practices.",
  },
  {
    id: "article-2",
    slug: "digital-literacy-300-participants",
    title: "Digital Literacy Program Reaches 300+ Participants",
    image: "/news/digital-literacy.jpg",
    date: "Nov 22, 2024",
    content: `
      <p>Our Digital Literacy Program has reached a significant milestone, having successfully trained over 300 community members in essential digital skills.</p>
      
      <h2>Program Success</h2>
      <p>The program, which began six months ago, has seen remarkable participation from community members of all ages, with a particular focus on:</p>
      <ul>
        <li>Basic computer operations</li>
        <li>Internet navigation and online safety</li>
        <li>Email communication</li>
        <li>Digital document creation</li>
        <li>Social media for business</li>
      </ul>

      <h2>Participant Stories</h2>
      <p>Many participants have reported significant improvements in their digital confidence and have started applying these skills in their daily lives and businesses.</p>
    `,
    metaTitle: "Digital Literacy Training Success - 300+ Participants",
    metaDescription:
      "Over 300 community members trained in essential digital skills through OKARANIME Foundation's Digital Literacy Program.",
  },
  {
    id: "article-3",
    slug: "partnership-techbridge-africa",
    title: "Partnership with TechBridge Africa Expands Opportunities",
    image: "/news/partnership.jpg",
    date: "Nov 18, 2024",
    content: `
      <p>We are proud to announce our new partnership with TechBridge Africa, which will bring advanced technology training to underserved youth across multiple states in Nigeria.</p>
      
      <h2>Partnership Details</h2>
      <p>This collaboration will focus on providing:</p>
      <ul>
        <li>Advanced programming courses</li>
        <li>Web development training</li>
        <li>Mobile app development</li>
        <li>Data science fundamentals</li>
        <li>Cybersecurity awareness</li>
      </ul>

      <h2>Expected Impact</h2>
      <p>The partnership aims to reach over 1,000 youth in the first year, with a focus on creating pathways to employment in the growing tech sector.</p>
    `,
    metaTitle: "TechBridge Africa Partnership - Advanced Tech Training",
    metaDescription:
      "OKARANIME Foundation partners with TechBridge Africa to provide advanced technology training to underserved youth across Nigeria.",
  },
  {
    id: "article-4",
    slug: "creative-arts-exhibition",
    title: "Creative Arts Exhibition Showcases Local Talent",
    image: "/news/arts-exhibition.jpg",
    date: "Nov 12, 2024",
    content: `
      <p>Young artists from our talent discovery program recently displayed their incredible work at a community exhibition that attracted hundreds of visitors.</p>
      
      <h2>Exhibition Highlights</h2>
      <p>The exhibition featured various forms of artistic expression including:</p>
      <ul>
        <li>Traditional paintings and drawings</li>
        <li>Sculptures and pottery</li>
        <li>Digital art and graphic design</li>
        <li>Photography exhibitions</li>
        <li>Performance arts</li>
      </ul>

      <h2>Talent Discovery</h2>
      <p>This event showcased the remarkable talent within our communities and provided a platform for young artists to gain recognition and potential business opportunities.</p>
    `,
    metaTitle: "Creative Arts Exhibition - Local Talent Showcase",
    metaDescription:
      "Young artists from OKARANIME Foundation's talent discovery program showcase their work at community exhibition.",
  },
  {
    id: "article-5",
    slug: "womens-business-incubator",
    title: "Women's Business Incubator Graduates First Cohort",
    image: "/news/business-incubator.jpg",
    date: "Nov 8, 2024",
    content: `
      <p>We celebrate the successful graduation of the first cohort from our Women's Business Incubator program, with 25 handicapped women completing intensive business training.</p>
      
      <h2>Program Achievements</h2>
      <p>The 12-week program covered essential business skills including:</p>
      <ul>
        <li>Business plan development</li>
        <li>Financial management</li>
        <li>Marketing and sales strategies</li>
        <li>Customer service excellence</li>
        <li>Digital presence creation</li>
      </ul>

      <h2>Seed Funding</h2>
      <p>All graduates received seed funding to launch their business ventures, along with ongoing mentorship and support from our business development team.</p>
    `,
    metaTitle: "Women's Business Incubator - First Cohort Graduation",
    metaDescription:
      "25 handicapped women graduate from OKARANIME Foundation's Business Incubator program with seed funding for their ventures.",
  },
  {
    id: "article-6",
    slug: "annual-impact-report",
    title: "Annual Impact Report Shows 85% Success Rate",
    image: "/news/impact-report.jpg",
    date: "Nov 3, 2024",
    content: `
      <p>Our latest annual impact report reveals an impressive 85% success rate across all our empowerment programs, demonstrating the effectiveness of our community-focused approach.</p>
      
      <h2>Key Findings</h2>
      <p>The report highlights significant achievements in:</p>
      <ul>
        <li>Youth employment and skill development</li>
        <li>Women's economic empowerment</li>
        <li>Community health initiatives</li>
        <li>Educational outreach programs</li>
        <li>Talent discovery and development</li>
      </ul>

      <h2>Future Goals</h2>
      <p>Building on this success, we aim to expand our programs to reach more communities while maintaining our high standards of impact and effectiveness.</p>
    `,
    metaTitle: "Annual Impact Report - 85% Success Rate",
    metaDescription:
      "OKARANIME Foundation's annual impact report shows 85% success rate across all empowerment programs and community initiatives.",
  },
  {
    id: "article-7",
    slug: "youth-entrepreneurship-expansion",
    title: "Youth Entrepreneurship Program Expands to 3 New States",
    image: "/news/entrepreneurship.jpg",
    date: "Oct 29, 2024",
    content: `
      <p>Our Youth Entrepreneurship Program is expanding its reach to three new states: Lagos, Rivers, and Kano, bringing entrepreneurial training to thousands more young Nigerians.</p>
      
      <h2>Expansion Details</h2>
      <p>The expansion will include:</p>
      <ul>
        <li>New training centers in each state</li>
        <li>Localized curriculum development</li>
        <li>Partnerships with state governments</li>
        <li>Industry-specific mentorship programs</li>
        <li>Access to startup capital</li>
      </ul>

      <h2>Expected Reach</h2>
      <p>We anticipate training over 2,000 young entrepreneurs across the three new states in the first year of expansion.</p>
    `,
    metaTitle: "Youth Entrepreneurship Program Expands to 3 States",
    metaDescription:
      "OKARANIME Foundation expands Youth Entrepreneurship Program to Lagos, Rivers, and Kano states.",
  },
  {
    id: "article-8",
    slug: "community-health-initiative",
    title: "Community Health Initiative Reaches 5000+ Beneficiaries",
    image: "/news/health-initiative.jpg",
    date: "Oct 25, 2024",
    content: `
      <p>Our Community Health Initiative has successfully reached over 5,000 beneficiaries through free health screenings and medical outreach programs in rural communities.</p>
      
      <h2>Health Services Provided</h2>
      <p>The initiative offered comprehensive health services including:</p>
      <ul>
        <li>General health check-ups</li>
        <li>Blood pressure and sugar level tests</li>
        <li>Eye and dental examinations</li>
        <li>Maternal and child health services</li>
        <li>Health education and awareness</li>
      </ul>

      <h2>Community Impact</h2>
      <p>This initiative has significantly improved healthcare access in underserved communities and identified health issues that required further medical attention.</p>
    `,
    metaTitle: "Community Health Initiative - 5000+ Beneficiaries",
    metaDescription:
      "OKARANIME Foundation's health initiative provides free medical services to over 5,000 community members.",
  },
  {
    id: "article-9",
    slug: "digital-skills-senior-citizens",
    title: "Digital Skills Training for Senior Citizens",
    image: "/news/senior-digital.jpg",
    date: "Oct 20, 2024",
    content: `
      <p>We have launched a special Digital Skills Training program specifically designed for senior citizens, helping bridge the digital divide for elderly community members.</p>
      
      <h2>Program Focus</h2>
      <p>The training focuses on practical digital skills that seniors can use in their daily lives:</p>
      <ul>
        <li>Smartphone and tablet basics</li>
        <li>Video calling with family</li>
        <li>Online banking and payments</li>
        <li>Social media for staying connected</li>
        <li>Online safety and security</li>
      </ul>

      <h2>Special Considerations</h2>
      <p>The program features adapted learning materials, patient instructors, and a supportive environment tailored to the needs of senior learners.</p>
    `,
    metaTitle: "Digital Skills Training for Senior Citizens",
    metaDescription:
      "OKARANIME Foundation launches digital literacy program specifically designed for elderly community members.",
  },
];
