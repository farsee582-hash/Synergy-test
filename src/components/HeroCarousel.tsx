"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface HeroSlide {
    id: string;
    title: string;
    subtitle: string | null;
    imageUrl: string;
    ctaText: string;
    ctaLink: string;
}

interface HeroCarouselProps {
    slides: HeroSlide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide effect
    useEffect(() => {
        if (slides.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 5000); // 5 seconds per slide

        return () => clearInterval(interval);
    }, [slides.length]);

    if (!slides || slides.length === 0) {
        return null; // Or a fallback default hero
    }

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section className="hero-wrapper">
            <div className="hero-inner">
                {/* Slides Container */}
                <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "inherit" }}>
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className="hero-content"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                height: "100%",
                                opacity: index === currentIndex ? 1 : 0,
                                transition: "opacity 1s ease-in-out",
                                zIndex: index === currentIndex ? 1 : 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                color: "white"
                            }}
                        >
                            {/* Background Image */}
                            <div style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                                zIndex: -1
                            }}>
                                <Image
                                    src={slide.imageUrl}
                                    alt={slide.title}
                                    fill
                                    style={{
                                        objectFit: "cover",
                                        opacity: 0.4 // Darken overlay for text readability
                                    }}
                                    priority={index === 0}
                                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                                />
                                {/* Gradient Overlay */}
                                <div style={{
                                    position: "absolute",
                                    top: 0, left: 0, right: 0, bottom: 0,
                                    background: "linear-gradient(to bottom, rgba(5,27,53,0.3), rgba(5,27,53,0.7))"
                                }}></div>
                            </div>

                            {/* Content */}
                            <h1 className="hero-title" style={{
                                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                                transform: index === currentIndex ? "translateY(0)" : "translateY(20px)",
                                opacity: index === currentIndex ? 1 : 0,
                                transition: "all 1s ease-out 0.2s"
                            }}>
                                {slide.title}
                            </h1>
                            {slide.subtitle && (
                                <p className="hero-subtitle" style={{
                                    opacity: 0.9,
                                    maxWidth: "700px",
                                    transform: index === currentIndex ? "translateY(0)" : "translateY(20px)",
                                    transition: "all 1s ease-out 0.4s"
                                }}>
                                    {slide.subtitle}
                                </p>
                            )}
                            <Link href={slide.ctaLink} className="btn" style={{
                                backgroundColor: "var(--primary-green)",
                                color: "white",
                                padding: "1rem 2.5rem",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                textDecoration: "none",
                                fontSize: "1.1rem",
                                transform: index === currentIndex ? "translateY(0)" : "translateY(20px)",
                                opacity: index === currentIndex ? 1 : 0,
                                transition: "all 1s ease-out 0.6s",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                            }}>
                                {slide.ctaText}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Navigation Controls (Only if > 1 slide) */}
                {slides.length > 1 && (
                    <>
                        {/* Arrows */}
                        <button
                            onClick={prevSlide}
                            style={{
                                position: "absolute",
                                left: "2rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                background: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                color: "white",
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                cursor: "pointer",
                                zIndex: 10,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "1.5rem",
                                backdropFilter: "blur(4px)"
                            }}
                        >
                            ‹
                        </button>
                        <button
                            onClick={nextSlide}
                            style={{
                                position: "absolute",
                                right: "2rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                background: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                color: "white",
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                cursor: "pointer",
                                zIndex: 10,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "1.5rem",
                                backdropFilter: "blur(4px)"
                            }}
                        >
                            ›
                        </button>

                        {/* Dots */}
                        <div style={{
                            position: "absolute",
                            bottom: "2rem",
                            left: "50%",
                            transform: "translateX(-50%)",
                            display: "flex",
                            gap: "0.75rem",
                            zIndex: 10
                        }}>
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    style={{
                                        width: "12px",
                                        height: "12px",
                                        borderRadius: "50%",
                                        backgroundColor: idx === currentIndex ? "var(--primary-green)" : "rgba(255,255,255,0.3)",
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "background-color 0.3s"
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
