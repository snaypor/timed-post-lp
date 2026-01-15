'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

interface OrbitItem {
    id: number;
    name: string;
    src?: string;
    icon?: React.ReactNode;
}

interface RadialIntroProps {
    orbitItems: OrbitItem[];
    centerContent?: React.ReactNode;
    size?: number;
}

export function RadialIntro({
    orbitItems,
    centerContent,
    size = 320
}: RadialIntroProps) {
    const [mounted, setMounted] = useState(false);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Split items into inner and outer orbits
    const innerOrbit = orbitItems.slice(0, Math.ceil(orbitItems.length / 2));
    const outerOrbit = orbitItems.slice(Math.ceil(orbitItems.length / 2));

    const innerRadius = size * 0.32;
    const outerRadius = size * 0.46;

    return (
        <div
            className="relative flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            {/* Gradient background glow */}
            <div
                className="absolute inset-0 rounded-full opacity-40"
                style={{
                    background: 'radial-gradient(circle at center, rgba(73, 136, 196, 0.3) 0%, rgba(189, 232, 245, 0.2) 40%, transparent 70%)',
                }}
            />

            {/* Orbit ring lines */}
            <div
                className="absolute rounded-full border border-[#BDE8F5]/40"
                style={{
                    width: innerRadius * 2 + 48,
                    height: innerRadius * 2 + 48,
                }}
            />
            <div
                className="absolute rounded-full border border-[#BDE8F5]/25"
                style={{
                    width: outerRadius * 2 + 48,
                    height: outerRadius * 2 + 48,
                }}
            />

            {/* Center content */}
            <div className="absolute z-20 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1C4D8D] to-[#4988C4] shadow-lg shadow-[#1C4D8D]/30">
                {centerContent || (
                    <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                )}
            </div>

            {/* Inner orbit items */}
            <div
                className={`absolute transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    animation: 'spin-slow 30s linear infinite',
                }}
            >
                {innerOrbit.map((item, index) => {
                    const angle = (index / innerOrbit.length) * 2 * Math.PI - Math.PI / 2;
                    const x = Math.cos(angle) * innerRadius;
                    const y = Math.sin(angle) * innerRadius;

                    return (
                        <div
                            key={item.id}
                            className="absolute"
                            style={{
                                left: '50%',
                                top: '50%',
                                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                            }}
                        >
                            <div
                                className={`group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-white shadow-[0_4px_20px_rgba(15,40,84,0.12)] transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_30px_rgba(15,40,84,0.2)] ${hoveredId === item.id ? 'scale-110 ring-2 ring-[#4988C4]' : ''
                                    }`}
                                style={{
                                    animation: 'counter-spin-slow 30s linear infinite',
                                }}
                                onMouseEnter={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {item.src ? (
                                    <img
                                        src={item.src}
                                        alt={item.name}
                                        className="h-8 w-8 rounded-lg object-cover"
                                    />
                                ) : item.icon ? (
                                    <div className="text-[#4988C4]">{item.icon}</div>
                                ) : (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#BDE8F5] to-[#4988C4] text-xs font-bold text-white">
                                        {item.name.charAt(0)}
                                    </div>
                                )}

                                {/* Tooltip */}
                                <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0F2854] px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100`}>
                                    {item.name}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Outer orbit items */}
            <div
                className={`absolute transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    animation: 'spin-reverse 40s linear infinite',
                }}
            >
                {outerOrbit.map((item, index) => {
                    const angle = (index / outerOrbit.length) * 2 * Math.PI;
                    const x = Math.cos(angle) * outerRadius;
                    const y = Math.sin(angle) * outerRadius;

                    return (
                        <div
                            key={item.id}
                            className="absolute"
                            style={{
                                left: '50%',
                                top: '50%',
                                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                            }}
                        >
                            <div
                                className={`group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-white shadow-[0_4px_20px_rgba(15,40,84,0.12)] transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_30px_rgba(15,40,84,0.2)] ${hoveredId === item.id ? 'scale-110 ring-2 ring-[#4988C4]' : ''
                                    }`}
                                style={{
                                    animation: 'counter-spin-reverse 40s linear infinite',
                                }}
                                onMouseEnter={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {item.src ? (
                                    <img
                                        src={item.src}
                                        alt={item.name}
                                        className="h-8 w-8 rounded-lg object-cover"
                                    />
                                ) : item.icon ? (
                                    <div className="text-[#4988C4]">{item.icon}</div>
                                ) : (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#BDE8F5] to-[#4988C4] text-xs font-bold text-white">
                                        {item.name.charAt(0)}
                                    </div>
                                )}

                                {/* Tooltip */}
                                <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0F2854] px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100`}>
                                    {item.name}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* CSS Animations */}
            <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes counter-spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        @keyframes counter-spin-reverse {
          from {
            transform: rotate(-360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
      `}</style>
        </div>
    );
}
