import { cn } from "@/lib/utils";
import createGlobe from "cobe";
import { useEffect, useRef, useState, useCallback } from "react";
import { useSpring } from "react-spring";
import { locations } from "@/const/ExportLocations";

export function Cobe() {
  const globeRef = useRef<any | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerInteracting = useRef<number  | null>(null);
  const pointerInteractionMovement = useRef(0);
  const focusRef = useRef<[number, number]>([0, 0]);
  const [autoRotate, setAutoRotate] = useState(true);

  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  const locationToAngles = (lat: number, long: number): [number, number] => {
    return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180];
  };

  const createGlobeInstance = useCallback(() => {
    if (globeRef.current) { globeRef.current.destroy() }

    let phi = 0;
    let width = 0;
    let currentPhi = 0;
    let currentTheta = 0;
    const doublePi = Math.PI * 2;

    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();

    if (canvasRef.current) {
      globeRef.current = createGlobe(canvasRef.current, {
        width: width * 2,
        height: width * 2,
        devicePixelRatio: 2,
        phi: 0,
        theta: 0.3,
        dark: 0,
        diffuse: 3,
        mapSamples: 18000,
        mapBrightness: 1.2,
        baseColor: [1, 1, 1],
        markerColor: [251 / 255, 100 / 255, 21 / 255],
        glowColor: [1, 1, 1],
        opacity: 0.6,
        markers: locations.map((loc) => ({
          location: loc.location as [number, number],
          size: loc.size ?? 0.1,
        })),
        onRender: (state) => {
          if (autoRotate && !pointerInteracting.current) { phi += 0.005 }
          state.phi = phi + r.get();

          if (!autoRotate) {
            const [focusPhi, focusTheta] = focusRef.current;
            const distPositive = (focusPhi - currentPhi + doublePi) % doublePi;
            const distNegative = (currentPhi - focusPhi + doublePi) % doublePi;
            if (distPositive < distNegative) {
              currentPhi += distPositive * 0.08;
            } else {
              currentPhi -= distNegative * 0.08;
            }
            currentTheta = currentTheta * 0.92 + focusTheta * 0.08;
            state.phi = currentPhi;
            state.theta = currentTheta;
          }

          state.width = width * 2;
          state.height = width * 2;
        },
      });
    }

    return () => {
      if (globeRef.current) { globeRef.current.destroy() }
      window.removeEventListener("resize", onResize);
    };
  }, [autoRotate, locations]);

  useEffect(() => {
    const cleanupFn = createGlobeInstance();
    return cleanupFn;
  }, [createGlobeInstance]);

  useEffect(() => {
    if (canvasRef.current) { canvasRef.current.style.opacity = "1"; }
  }, []);

  return (
    <div className="w-full relative m-auto aspect-[1/1] max-w-[600px]">
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
          if(canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if(canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if(canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({ r: delta / 200 });
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({
              r: delta / 100,
            });
          }
        }}
        style={globeStyles}
      />
      <div className="flex justify-center items-center gap-4 flex-wrap">
        <button
          className={cn(
            "bg-white border !px-3 !py-1 hover:shadow transition hover:bg-neutral-100",
            "group btn-shiny-parent !flex"
          )}
          onClick={() => {
            setAutoRotate(true);
          }}
        >
          <span className="text-sm font-normal flex">Auto Rotate</span>

          <div className="btn-shiny-effect">
            <div className="relative h-full w-8 bg-black/10"></div>
          </div>
        </button>
        {locations.map((loc) => (
          <button
            key={loc.city}
            className={cn(
              "bg-white border !px-3 !py-1 hover:shadow transition hover:bg-neutral-100",
              "group btn-shiny-parent !flex"
            )}
            onClick={() => {
              setAutoRotate(false);
              focusRef.current = locationToAngles(
                loc.location[0],
                loc.location[1]
              );
            }}
          >
            <span className="text-sm font-normal flex">
              {loc.flag} {loc.city}
            </span>

            <div className="btn-shiny-effect">
              <div className="relative h-full w-8 bg-black/10"></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
export default Cobe;

const globeStyles = {
  width: "100%",
  height: "100%",
  cursor: "grab",
  contain: "layout paint size",
  opacity: 0,
  transition: "opacity 1s ease",
};
