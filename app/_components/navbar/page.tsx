"use client";
import React, { useRef, } from "react";
import { BG, ME } from "@/app/_assets/page";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RiDiscFill } from "react-icons/ri";
import { PiInfo } from "react-icons/pi";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Image from "next/image";

export default function Navbar() {;

  const audioRef = useRef<HTMLAudioElement>(null);

  const container = useRef<HTMLDivElement>(null);

  const tl = useRef<gsap.core.Timeline | null>(null);
  
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    gsap.set("#menu-link-item-holder", { y: 75 });
    gsap.set("#nav-footer", { y: 20 });

    tl.current = gsap.timeline({ paused: true })
      .to("#menu-overlay", {
        duration: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4.inOut"
      })
      .to("#menu-link-item-holder", {
        y: 0,
        duration: 1,
        stagger: 0.1,
        opacity: 1,
        ease: "power4.inOut",
        delay: -0.75
      })
      .to("#nav-footer", {
        y: 0,
        duration: 1,
        opacity: 1,
        ease: "power4.inOut",
        delay: -0.75
      });
  }, { scope: container });

  useGSAP(() => {
    tweenRef.current = gsap.to("#disc", {
      duration: 25,
      rotation: 360,
      repeat: -1,
      ease: "none",
      paused: true
    });
  }, []);

  const play = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        tweenRef.current?.resume();
      } else {
        audioRef.current.pause();
        tweenRef.current?.pause();
      }
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40">
        <div className="flex items-center justify-between border-b-[#6D6963] border-[1px] py-3">
          <div className="flex items-center ml-8 font-KURIER text-xl">
            <p className="pr-2">BASED IN:</p>
            <p className="uppercase">{ME.location}</p>
          </div>
          <div className="text-5xl font-Chomsky">
            <p>{ME.web}</p>
          </div>
          <div className="flex items-center">
            <div className="mr-4 flex items-center">
              <PiInfo className="text-2xl cursor-pointer mr-1 hover:scale-110 transition-all delay-75" aria-describedby={id} variant="contained" onClick={handleClick} />
              <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}>
                <Typography sx={{borderRadius: "0.375rem"}}>
                  <div className="flex flex-col font-KURIER pt-1 rounded-md text-lg">
                    <div className="flex flex-col items-center">
                      <div className="relative w-56 h-52">
                        <Image className="absolute rounded-md" src="/music/lukrembo-this-is-for-you.webp" alt="Fountain of Belleau" sizes="16vw" fill objectFit="cover" quality={100} loading="lazy"/>
                      </div>
                      <div className="flex flex-col text-center">
                        <p className="px-3">{BG.title}</p>
                        <p><Link href={BG.link} className="underline hover:no-underline" target="_blank">{BG.by}</Link></p>
                      </div>
                    </div>
                    <div className="p-1 border-t-black border-[1px] mt-2 leading-3">
                        <p className="text-[#C03F13] font-semibold pt-3 text-xl">TIP!</p>
                        <p className="flex items-center">Click this icon<RiDiscFill className="text-4xl px-1"/>to</p>
                        <p>play/pause music.</p>
                    </div>
                  </div>
                </Typography>
              </Popover>
              <RiDiscFill className="cursor-pointer text-6xl" onClick={play} id="disc" />
              <audio loop src="/music/Lukrembo - This is For You.mp3" ref={audioRef}></audio>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
