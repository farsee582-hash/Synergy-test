"use client";

import PartnerLogo from "@/components/PartnerLogo";

interface PartnerCardProps {
    partner: {
        id: string;
        name: string;
        logoUrl: string;
    };
}

export default function PartnerCard({ partner }: PartnerCardProps) {
    return (
        <div
            style={{ width: "140px", height: "70px", display: "flex", alignItems: "center", justifyContent: "center", filter: "grayscale(100%)", transition: "filter 0.3s", opacity: 0.8 }}
            onMouseOver={(e: any) => { e.currentTarget.style.filter = "grayscale(0%)"; e.currentTarget.style.opacity = "1"; }}
            onMouseOut={(e: any) => { e.currentTarget.style.filter = "grayscale(100%)"; e.currentTarget.style.opacity = "0.8"; }}
        >
            <PartnerLogo src={partner.logoUrl} alt={partner.name} />
        </div>
    );
}
