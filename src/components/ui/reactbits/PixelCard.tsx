import { useEffect, useRef } from 'react';

class Pixel {
    width: number;
    height: number;
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    color: string;
    speed: number;
    size: number;
    sizeStep: number;
    minSize: number;
    maxSizeInteger: number;
    maxSize: number;
    delay: number;
    counter: number;
    counterStep: number;
    isIdle: boolean;
    isReverse: boolean;
    isShimmer: boolean;

    constructor(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        color: string,
        speed: number,
        delay: number
    ) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = context;
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = this.getRandomValue(0.1, 0.9) * speed;
        this.size = 0;
        this.sizeStep = Math.random() * 0.4;
        this.minSize = 0.5;
        this.maxSizeInteger = 2;
        this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
        this.delay = delay;
        this.counter = 0;
        this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
        this.isIdle = false;
        this.isReverse = false;
        this.isShimmer = false;
    }

    getRandomValue(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    draw() {
        const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
    }

    appear() {
        this.isIdle = false;
        if (this.counter <= this.delay) {
            this.counter += this.counterStep;
            return;
        }
        if (this.size >= this.maxSize) {
            this.isShimmer = true;
        }
        if (this.isShimmer) {
            this.shimmer();
        } else {
            this.size += this.sizeStep;
        }
        this.draw();
    }

    disappear() {
        this.isShimmer = false;
        this.counter = 0;
        if (this.size <= 0) {
            this.isIdle = true;
            return;
        } else {
            this.size -= 0.1;
        }
        this.draw();
    }

    shimmer() {
        if (this.size >= this.maxSize) {
            this.isReverse = true;
        } else if (this.size <= this.minSize) {
            this.isReverse = false;
        }

        if (this.isReverse) {
            this.size -= this.speed;
        } else {
            this.size += this.speed;
        }
        this.draw();
    }
}

interface PixelCardProps {
    children?: React.ReactNode;
    className?: string;
    gap?: number;
    speed?: number;
    colors?: string[];
    noFocus?: boolean;
}

export default function PixelCard({
    children,
    className = '',
    gap = 5,
    speed = 35,
    colors = ['#f8fafc', '#f1f5f9', '#cbd5e1'],
    noFocus = false
}: PixelCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pixelsRef = useRef<Pixel[]>([]);
    const animationRef = useRef<number | null>(null);

    const initPixels = () => {
        if (!containerRef.current || !canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const rect = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;

        pixelsRef.current = [];
        for (let x = 0; x < canvasRef.current.width; x += gap) {
            for (let y = 0; y < canvasRef.current.height; y += gap) {
                const color = colors[Math.floor(Math.random() * colors.length)];
                pixelsRef.current.push(new Pixel(canvasRef.current, ctx, x, y, color, speed * 0.001, Math.random() * 20));
            }
        }
    };

    const doAnimate = (fnName: 'appear' | 'disappear') => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        let allIdle = true;
        for (let i = 0; i < pixelsRef.current.length; i++) {
            const pixel = pixelsRef.current[i];
            // @ts-ignore
            pixel[fnName]();
            if (!pixel.isIdle) {
                allIdle = false;
            }
        }
        if (!allIdle) {
            animationRef.current = requestAnimationFrame(() => doAnimate(fnName));
        }
    };

    const onMouseEnter = () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        doAnimate('appear');
    };
    const onMouseLeave = () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        doAnimate('disappear');
    };

    useEffect(() => {
        initPixels();
        window.addEventListener('resize', initPixels);
        return () => window.removeEventListener('resize', initPixels);
    }, [gap, speed, colors]);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden border border-slate-200 dark:border-slate-800 rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm transition-all duration-300 ${className}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
            <div className="relative z-10">{children}</div>
        </div>
    );
}
