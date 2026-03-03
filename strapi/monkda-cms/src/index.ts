export default {
  register() {},

  async bootstrap({ strapi }: { strapi: any }) {
    /* ──────────────────────────────────────────────────────────────
       1. Seed Categories
       ────────────────────────────────────────────────────────────── */
    const categories = [
      { name: "Real Estate", slug: "real-estate" },
      { name: "Automobile", slug: "automobile" },
      { name: "Gym", slug: "gym" },
      { name: "Clinic", slug: "clinic" },
      { name: "Lawyer", slug: "lawyer" },
    ];

    console.log("--- Starting MonkDA Category Seeding ---");

    const categoryMap: Record<string, string> = {}; // slug -> documentId

    for (const cat of categories) {
      try {
        // Check if exists via document service
        const existing = await strapi.documents("api::category.category").findMany({
          filters: { slug: cat.slug },
          limit: 1,
        });

        if (existing.length === 0) {
          const created = await strapi.documents("api::category.category").create({
            data: { ...cat },
            status: "published",
          });
          categoryMap[cat.slug] = created.documentId;
          console.log(`Created category: ${cat.name}`);
        } else {
          categoryMap[cat.slug] = existing[0].documentId;
          console.log(`Category exists: ${cat.name}`);
        }
      } catch (err: any) {
        console.error(`Error seeding category ${cat.name}:`, err.message);
      }
    }

    /* ──────────────────────────────────────────────────────────────
       2. Seed Blog Posts
       ────────────────────────────────────────────────────────────── */
    const blogPosts = [
      // ─── REAL ESTATE ──────────────────────────────────────────
      {
        title: "Why Page Speed Decides Real Estate Lead Conversion",
        slug: "page-speed-real-estate-leads",
        excerpt: "Studies show that a 1-second delay in property portal load time reduces leads by 7 percent. Here is how we fix that.",
        categorySlug: "real-estate",
        content: [
          { type: "paragraph", children: [{ type: "text", text: "In the world of luxury real estate, the first impression is digital. A buyer browsing a 2M Chelsea townhouse expects the same premium experience online as they would at a physical viewing." }] },
          { type: "heading", level: 2, children: [{ type: "text", text: "The Cost of Every Second" }] },
          { type: "paragraph", children: [{ type: "text", text: "Research by Google shows that 53% of mobile users abandon a site that takes longer than 3 seconds to load. For real estate portals with high-resolution imagery, this is a critical challenge. Our optimization engine compresses HD property images by 82% without visible quality loss, bringing LCP under 0.4 seconds." }] },
          { type: "heading", level: 2, children: [{ type: "text", text: "Our $1 Approach" }] },
          { type: "paragraph", children: [{ type: "text", text: "We start with your most critical landing page, whether it is a search portal, a luxury listing, or your home page. We optimize image delivery, script loading order, and server-side rendering to achieve 99/100 Google PageSpeed scores." }] },
        ],
      },
      {
        title: "Core Web Vitals: The SEO Secret Weapon for Estate Agents",
        slug: "core-web-vitals-estate-agents",
        excerpt: "Google now penalizes property listings that fail Core Web Vitals. Learn how to dominate local search rankings.",
        categorySlug: "real-estate",
        content: [
          { type: "paragraph", children: [{ type: "text", text: "Since the 2024 algorithm update, Core Web Vitals have become a make-or-break ranking factor. Estate agents who ignore LCP, FID, and CLS are effectively invisible in local search results." }] },
          { type: "heading", level: 2, children: [{ type: "text", text: "What Are Core Web Vitals?" }] },
          { type: "paragraph", children: [{ type: "text", text: "Core Web Vitals are a set of three metrics that Google uses to measure real-world user experience: Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS). Passing all three is now essential for ranking in property searches." }] },
          { type: "paragraph", children: [{ type: "text", text: "Our clients consistently achieve 100/100 Lighthouse scores after our optimization, resulting in an average 45% increase in organic search visibility within 30 days." }] },
        ],
      },
      {
        title: "How HD Property Images Kill Your Mobile Performance",
        slug: "hd-images-mobile-performance",
        excerpt: "80% of property buyers browse on mobile. If your high-res images are not optimized, you are losing deals.",
        categorySlug: "real-estate",
        content: [
          { type: "paragraph", children: [{ type: "text", text: "Every luxury listing demands stunning visual presentation. But there is a hidden cost: unoptimized 4K property images can balloon page weight to 15MB+, causing catastrophic load times on mobile networks." }] },
          { type: "heading", level: 2, children: [{ type: "text", text: "The Solution: Next-Gen Formats" }] },
          { type: "paragraph", children: [{ type: "text", text: "We convert all property images to WebP/AVIF formats with responsive sizing. A 5MB JPEG becomes a 180KB WebP with no visible quality reduction. Combined with lazy loading and CDN edge delivery, your listings load instantly on any device." }] },
        ],
      },

      // ─── AUTOMOBILE ────────────────────────────────────────────
      {
        title: "Speed Sells: Why Automotive Websites Need Sub-Second Load Times",
        slug: "automotive-sub-second-load",
        excerpt: "Car buyers research an average of 12 sites before making a decision. If yours is slow, you are eliminated first.",
        categorySlug: "automobile",
        content: [
          { type: "paragraph", children: [{ type: "text", text: "The modern car buyer journey is 95% digital. From comparing specs to building custom configurations, the entire experience must be seamless. A slow-loading inventory page is not just frustrating, it is a lost sale." }] },
          { type: "heading", level: 2, children: [{ type: "text", text: "The Competitive Edge" }] },
          { type: "paragraph", children: [{ type: "text", text: "Our automotive clients see an average 140% increase in test drive bookings after optimization. By reducing Time to Interactive (TTI) from 6+ seconds to under 1 second, we keep potential buyers engaged through the entire purchase funnel." }] },
        ],
      },
      {
        title: "Optimizing 360-Degree Car Configurators for Mobile Performance",
        slug: "360-car-configurators-mobile",
        excerpt: "Interactive 3D configurators are amazing until they crash on mobile. Here is how to make them fly.",
        categorySlug: "automobile",
        content: [
          { type: "paragraph", children: [{ type: "text", text: "360-degree car configurators have become the gold standard for online car shopping. But these WebGL-heavy experiences often struggle on mobile devices, with frame rates dropping below 15fps and causing browser crashes." }] },
          { type: "heading", level: 2, children: [{ type: "text", text: "Our Optimization Stack" }] },
          { type: "paragraph", children: [{ type: "text", text: "We implement progressive loading, texture compression, and level-of-detail (LOD) systems that adapt to device capability. The result: buttery 60fps configurators on any phone." }] },
        ],
      },
      {
        title: "How Dealership Websites Lose 40% of Leads to Poor Web Vitals",
        slug: "dealership-websites-poor-vitals",
        excerpt: "Most dealership websites score below 30 on mobile Lighthouse. Here is the data on what that costs.",
        categorySlug: "automobile",
        content: [
          { type: "paragraph", children: [{ type: "text", text: "We audited 200 dealership websites across the UK and the numbers are staggering. The average mobile Lighthouse score was 28/100, with an average LCP of 8.4 seconds. In an industry where each qualified lead is worth thousands, this is unacceptable." }] },
          { type: "paragraph", children: [{ type: "text", text: "After our $1 optimization, these same sites averaged 94/100 mobile scores with LCP under 1.2 seconds. The result: a documented 42% increase in lead form submissions within the first month." }] },
        ],
      },

      // ─── GYM ──────────────────────────────────────────────────
      {
        title: "Member Retention Starts with a Fast App: The Gym Tech Advantage",
        slug: "gym-member-retention-fast-app",
        excerpt: "If your members cannot log a workout in under 2 taps, they will stop using the app. And then they cancel.",
        categorySlug: "gym",
        content: [
          { type: "paragraph", children: [{ type: "text", text: "The fitness industry has a churn problem. The average gym loses 50% of members within the first 6 months. But data shows that members who use a gym digital platform at least 3 times per week have a 78% retention rate." }] },
          { type: "heading", level: 2, children: [{ type: "text", text: "Speed = Engagement" }] },
          { type: "paragraph", children: [{ type: "text", text: "Every millisecond of lag in your booking flow or workout logger reduces engagement. Our optimization ensures sub-200ms interaction times, making the digital experience as seamless as walking into the gym." }] },
        ],
      },
      {
        title: "Streaming 4K Fitness Classes: CDN Strategy for Gym Platforms",
        slug: "streaming-4k-fitness-cdn",
        excerpt: "Your members expect Netflix-quality streaming for live classes. Here is how to deliver it without breaking the bank.",
        categorySlug: "gym",
        content: [
          { type: "paragraph", children: [{ type: "text", text: "Post-pandemic, every serious gym needs a digital content strategy. But streaming high-energy HIIT classes in 4K across global regions requires serious infrastructure or serious optimization." }] },
          { type: "paragraph", children: [{ type: "text", text: "We implement adaptive bitrate streaming, edge caching, and video compression pipelines that deliver zero-buffer 4K playback at 60% lower bandwidth costs than traditional CDN setups." }] },
        ],
      },
      {
        title: "Class Booking Systems: Why Peak-Hour Crashes Cost Gyms Thousands",
        slug: "class-booking-peak-hour-crashes",
        excerpt: "When 500 members hit Book Now at 7AM, does your system survive? Most do not.",
        categorySlug: "gym",
        content: [
          { type: "paragraph", children: [{ type: "text", text: "Peak-hour class booking is the ultimate stress test for gym software. When a popular spin class opens at 7AM and 500 members race to book, the platform that buckles loses trust permanently." }] },
          { type: "heading", level: 2, children: [{ type: "text", text: "Optimistic UI + Edge Functions" }] },
          { type: "paragraph", children: [{ type: "text", text: "We implement optimistic UI updates with edge-function-backed booking APIs that can handle 10,000 concurrent requests with sub-200ms confirmation times. Your members tap, they see confirmation, and the slot is theirs." }] },
        ],
      },

      // ─── CLINIC ───────────────────────────────────────────────
      {
        title: "Patient Portal Speed: Why Healthcare UX is a Clinical Imperative",
        slug: "patient-portal-speed-healthcare-ux",
        excerpt: "Slow patient portals are not just frustrating. They increase no-show rates by 35%. Speed is a clinical metric.",
        categorySlug: "clinic",
        content: [
          { type: "paragraph", children: [{ type: "text", text: "In healthcare, every second counts and that includes digital seconds. Research published in the Journal of Medical Internet Research shows that patients who experience friction in portal login or appointment booking are 35% more likely to miss scheduled visits." }] },
          { type: "heading", level: 2, children: [{ type: "text", text: "HIPAA-Compliant Speed" }] },
          { type: "paragraph", children: [{ type: "text", text: "The challenge in healthcare optimization is maintaining full HIPAA compliance while reducing load times. Our approach uses encrypted edge caching and stateless session tokens that deliver 0.4s LCP without ever storing Protected Health Information (PHI) on edge nodes." }] },
        ],
      },
      {
        title: "DICOM Image Rendering: Bringing Medical Imaging to the Web",
        slug: "dicom-image-rendering-web",
        excerpt: "DICOM files are massive and complex. Here is how we make MRI and CT scans instantly viewable in any browser.",
        categorySlug: "clinic",
        content: [
          { type: "paragraph", children: [{ type: "text", text: "Medical imaging has long been confined to specialized PACS workstations. But modern web technologies now allow DICOM rendering directly in the browser if the performance engineering is right." }] },
          { type: "paragraph", children: [{ type: "text", text: "Our proprietary lazy-loading engine for medical imaging ensures scans are interactive before they finish downloading. By implementing progressive DICOM rendering with Web Workers, we deliver sub-second initial display times for 500MB+ imaging studies." }] },
        ],
      },
      {
        title: "Telemedicine Latency: The Optimization Challenge for Virtual Clinics",
        slug: "telemedicine-latency-virtual-clinics",
        excerpt: "A 200ms delay in a video consultation feels like eternity to patients. Edge computing is the answer.",
        categorySlug: "clinic",
        content: [
          { type: "paragraph", children: [{ type: "text", text: "Telemedicine adoption has skyrocketed, but many platforms still suffer from latency issues that degrade the doctor-patient experience. When a specialist is examining a patient remotely, even 200ms of video delay creates a disconnect that undermines clinical confidence." }] },
          { type: "heading", level: 2, children: [{ type: "text", text: "Edge-First Architecture" }] },
          { type: "paragraph", children: [{ type: "text", text: "We implement WebRTC optimization with edge-deployed TURN servers that reduce round-trip latency by 60%. Combined with adaptive video quality scaling and AI-powered bandwidth prediction, our telemedicine optimization delivers sub-100ms latency globally." }] },
        ],
      },

      // ─── LAWYER ───────────────────────────────────────────────
      {
        title: "E-Discovery Portal Speed: Why Litigation Teams Need Sub-Second Access",
        slug: "e-discovery-portal-speed",
        excerpt: "When reviewing thousands of documents under deadline pressure, every second of portal lag costs billable hours.",
        categorySlug: "lawyer",
        content: [
          { type: "paragraph", children: [{ type: "text", text: "In high-stakes litigation, e-discovery portals process millions of documents. When a team of 20 associates is reviewing evidence under a court-imposed deadline, a portal that takes 3 seconds per document load costs hundreds of billable hours over the course of a case." }] },
          { type: "heading", level: 2, children: [{ type: "text", text: "Optimized Document Pipelines" }] },
          { type: "paragraph", children: [{ type: "text", text: "Our optimization reduces document rendering time from 3+ seconds to under 400ms by implementing pre-rendering queues, intelligent caching, and on-demand OCR processing. The result: associates review 3x more documents per hour." }] },
        ],
      },
      {
        title: "Client Intake Forms: Converting High-Value Legal Leads",
        slug: "client-intake-legal-leads",
        excerpt: "A high-value client will not wait 5 seconds for your intake form to load. Here is how to capture every lead.",
        categorySlug: "lawyer",
        content: [
          { type: "paragraph", children: [{ type: "text", text: "For law firms, every website visitor represents potential high-value revenue. A corporate client seeking litigation counsel expects the same digital sophistication from their law firm that they do from their private bank." }] },
          { type: "paragraph", children: [{ type: "text", text: "Our optimization of legal intake pipelines has resulted in a documented 112% increase in qualified lead submissions. By reducing form load time from 4.2s to 0.6s and implementing progressive form disclosure, we eliminate the friction that causes elite clients to bounce." }] },
        ],
      },
      {
        title: "Law Firm SEO: How Performance Engineering Drives Organic Growth",
        slug: "law-firm-seo-performance",
        excerpt: "In competitive legal markets like London and New York, page speed is the difference between page 1 and page 5.",
        categorySlug: "lawyer",
        content: [
          { type: "paragraph", children: [{ type: "text", text: "The legal industry is one of the most competitive spaces for paid and organic search. A single keyword like corporate litigation London can cost 80+ per click. But firms that invest in performance engineering consistently outrank competitors paying 5x more in ad spend." }] },
          { type: "heading", level: 2, children: [{ type: "text", text: "Technical SEO Dominance" }] },
          { type: "paragraph", children: [{ type: "text", text: "Our approach combines Core Web Vitals optimization, structured data markup, and server-side rendering to create law firm websites that Google recognizes as premium authorities. Our clients see an average 67% increase in organic traffic within 90 days of optimization." }] },
        ],
      },
    ];

    console.log("--- Starting MonkDA Blog Post Seeding ---");

    for (const post of blogPosts) {
      try {
        const existing = await strapi.documents("api::post.post").findMany({
          filters: { slug: post.slug },
          limit: 1,
        });

        if (existing.length === 0) {
          const catDocId = categoryMap[post.categorySlug];
          await strapi.documents("api::post.post").create({
            data: {
              title: post.title,
              slug: post.slug,
              excerpt: post.excerpt,
              content: post.content,
              category: catDocId || undefined,
            },
            status: "published",
          });
          console.log(`Created post: ${post.title}`);
        } else {
          console.log(`Post exists: ${post.title}`);
        }
      } catch (err: any) {
        console.error(`Error seeding post "${post.title}":`, err.message);
      }
    }

    console.log("--- Blog Seeding Complete ---");

    /* ──────────────────────────────────────────────────────────────
       3. Set Public Permissions (so the API is publicly readable)
       ────────────────────────────────────────────────────────────── */
    console.log("--- Setting Public Permissions ---");
    try {
      const publicRole = await strapi.db
        .query("plugin::users-permissions.role")
        .findOne({ where: { type: "public" } });

      if (publicRole) {
        const permissionsToEnable = [
          "api::category.category.find",
          "api::category.category.findOne",
          "api::post.post.find",
          "api::post.post.findOne",
        ];

        for (const actionId of permissionsToEnable) {
          const existing = await strapi.db
            .query("plugin::users-permissions.permission")
            .findOne({
              where: { action: actionId, role: publicRole.id },
            });

          if (!existing) {
            await strapi.db
              .query("plugin::users-permissions.permission")
              .create({
                data: { action: actionId, role: publicRole.id, enabled: true },
              });
            console.log(`Enabled: ${actionId}`);
          } else {
            console.log(`Already set: ${actionId}`);
          }
        }
        console.log("--- Public Permissions Set ---");
      }
    } catch (err: any) {
      console.error("Error setting permissions:", err.message);
    }
  },
};
