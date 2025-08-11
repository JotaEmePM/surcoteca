"use client";
import React from "react";

interface SkeletonTableProps {
    rows?: number;
    columns?: number;
    className?: string;
}

// Predefined width patterns for variety
const widthPatterns = [
    "w-40", // name
    "w-56", // description
    "w-48", // address
    "w-16", // short flag / status
    "w-24",
    "w-32",
];

export default function SkeletonTable({ rows = 5, columns = 4, className = "" }: SkeletonTableProps) {
    return (
        <div className={`mt-4 animate-pulse ${className}`.trim()}>
            <table className="min-w-full text-left border-separate border-spacing-y-2">
                <thead>
                    <tr>
                        {Array.from({ length: columns }).map((_, i) => (
                            <th key={i} className="px-4 py-2 text-sm font-semibold text-gray-500">
                                <div className={`h-4 rounded bg-gray-200 ${widthPatterns[i] || "w-28"}`} />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, ri) => (
                        <tr key={ri} className="bg-white/40">
                            {Array.from({ length: columns }).map((_, ci) => (
                                <td key={ci} className="px-4 py-3">
                                    <div className={`h-4 rounded bg-gray-200 ${widthPatterns[ci] || "w-28"}`} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
