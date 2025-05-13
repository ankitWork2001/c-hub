import React from "react";
import { Helmet } from "react-helmet";

const SeoTags = ({
     title = "CouponSmartDeals - Smart Coupons, Promo Codes & Best Deals",
     description = "Discover top online coupons, smart promo codes, discount deals, and savings offers. CouponSmartDeals helps you save more while shopping at your favorite stores.",
     keywords = "coupons, smart coupon, coupon smart deals, online deals, discount codes, smartdeals, promo offers, coupons smart, coupon smartdeals, smartcoupons, save money online",
     canonical = "https://www.couponsmartdeals.com",
}) => {
     // const jsonLd = {
     //      "@context": "https://schema.org",
     //      "@type": "WebSite",
     //      "name": "CouponSmartDeals",
     //      "url": canonical,
     //      "sameAs": [
     //           "https://www.facebook.com/couponsmartdeals",
     //           "https://www.instagram.com/couponsmartdeals",
     //           "https://twitter.com/couponsmartdeal"
     //      ]
     // };

     return (
          <Helmet>
               {/* Title & Basic Meta */}
               <title>{title}</title>
               <meta name="description" content={description} />
               <meta name="keywords" content={keywords} />
               <meta name="robots" content="index, follow" />
               <link rel="canonical" href={canonical} />
               <meta name="language" content="English" />
               <meta name="author" content="CouponSmartDeals Team" />
               <meta name="publisher" content="CouponSmartDeals" />

               {/* Open Graph (Facebook, LinkedIn) */}
               <meta property="og:title" content={title} />
               <meta property="og:description" content={description} />
               <meta property="og:type" content="website" />
               <meta property="og:url" content={canonical} />
               {/* <meta property="og:image" content={image} /> */}
               <meta property="og:site_name" content="CouponSmartDeals" />
               <meta property="og:locale" content="en_US" />

               {/* Twitter Card */}
               <meta name="twitter:card" content="summary_large_image" />
               <meta name="twitter:title" content={title} />
               <meta name="twitter:description" content={description} />
               {/* <meta name="twitter:image" content={image} /> */}
               <meta name="twitter:site" content="@couponsmartdeal" />

               {/* Schema.org Structured Data */}
               {/* <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> */}
          </Helmet>
     );
};

export default SeoTags;