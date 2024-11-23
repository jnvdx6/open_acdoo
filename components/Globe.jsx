"use client"

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { useSpring } from 'react-spring';
import { useTheme } from 'next-themes';

export function Globe() {
    const canvasRef = useRef();
    const pointerInteracting = useRef(null);
    const pointerInteractionMovement = useRef(0);
    const [{ r }, api] = useSpring(() => ({ r: 0, config: { mass: 1, tension: 280, friction: 40, precision: 0.001, }, }));
    const { theme } = useTheme();

    useEffect(() => {
        let phi = 0;
        let width = 0;
        const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
        window.addEventListener('resize', onResize)
        onResize()

        const isDarkMode = theme === 'dark';

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: 0.3,
            dark: isDarkMode ? 1 : 0,
            diffuse: 3,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: isDarkMode ? [0.3, 0.3, 0.3] : [1, 1, 1],
            markerColor: [0.93, 0.3, 0.15], // Rojo llamativo
            glowColor: isDarkMode ? [1, 0.5, 0.2] : [0.95, 0.3, 0.1], // Naranja brillante
            markers: [
                { location: [40.4168, -3.7038], size: 0.05, lineWidth: 0.5 },    // Madrid
                { location: [41.3851, 2.1734], size: 0.045, lineWidth: 0.5 },   // Barcelona
                { location: [37.3891, -5.9845], size: 0.04, lineWidth: 0.5 },   // Sevilla
                { location: [39.4699, -0.3763], size: 0.04, lineWidth: 0.5 },   // Valencia
                { location: [43.2627, -2.9253], size: 0.035, lineWidth: 0.5 },  // Bilbao
                { location: [37.9922, -1.1307], size: 0.035, lineWidth: 0.5 },  // Murcia
                { location: [28.4698, -16.2550], size: 0.03, lineWidth: 0.5 },  // Santa Cruz de Tenerife
                { location: [28.1248, -15.4300], size: 0.03, lineWidth: 0.5 },  // Las Palmas de Gran Canaria
                { location: [43.3623, -5.8486], size: 0.03, lineWidth: 0.5 },   // Oviedo
                { location: [42.8805, -8.5456], size: 0.03, lineWidth: 0.5 },   // Santiago de Compostela
            ],
            opacity: 0.9,
            onRender: (state) => {
                if (!pointerInteracting.current) {
                    phi += 0.003
                }
                state.phi = phi + r.get()
                state.width = width * 2
                state.height = width * 2
            }
        })
        setTimeout(() => canvasRef.current.style.opacity = '1')
        return () => { globe.destroy(); window.removeEventListener('resize', onResize); }
    }, [theme])

    return (
        <div style={{ width: '100%', maxWidth: 600, aspectRatio: 1, margin: 'auto', position: 'relative', }}>
            <canvas
                ref={canvasRef}
                onPointerDown={(e) => {
                    pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
                    canvasRef.current.style.cursor = 'grabbing';
                }}
                onPointerUp={() => {
                    pointerInteracting.current = null;
                    canvasRef.current.style.cursor = 'grab';
                }}
                onPointerOut={() => {
                    pointerInteracting.current = null;
                    canvasRef.current.style.cursor = 'grab';
                }}
                onMouseMove={(e) => {
                    if (pointerInteracting.current !== null) {
                        const delta = e.clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta;
                        api.start({ r: delta / 200, });
                    }
                }}
                onTouchMove={(e) => {
                    if (pointerInteracting.current !== null && e.touches[0]) {
                        const delta = e.touches[0].clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta;
                        api.start({ r: delta / 100, });
                    }
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    cursor: 'grab',
                    contain: 'layout paint size',
                    opacity: 0,
                    transition: 'opacity 1s ease',
                }}
            />
        </div>
    )
}