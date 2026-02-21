"use client";

import React from "react";

interface PartnerLogoProps {
    src: string;
    alt: string;
}

export default function PartnerLogo({ src, alt }: PartnerLogoProps) {
    return (
        <img
            src={src}
            alt={alt}
            style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                filter: "grayscale(100%)",
                transition: "filter 0.3s",
                cursor: "pointer"
            }}
            onMouseOver={(e) => (e.currentTarget.style.filter = "none")}
            onMouseOut={(e) => (e.currentTarget.style.filter = "grayscale(100%)")}
        />
    );
}
