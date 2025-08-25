
import type { FC } from 'react';
import GithubIcon from "@/components/icons/github";
import LinkedinIcon from "@/components/icons/linkedin";
import TelegramIcon from "@/components/icons/telegram";
import WhatsappIcon from "@/components/icons/whatsapp";
import PythonIcon from "@/components/icons/python";
import FlaskIcon from "@/components/icons/flask";
import PostgresqlIcon from "@/components/icons/postgresql";
import DockerIcon from "@/components/icons/docker";
import NodejsIcon from "@/components/icons/nodejs";
import ReactIcon from "@/components/icons/react";
import FirebaseIcon from "@/components/icons/firebase";
import D3Icon from "@/components/icons/d3";
import TensorflowIcon from "@/components/icons/tensorflow";
import InstagramIcon from '@/components/icons/instagram';
import type { IconProps } from '@/components/icons/icon-props';

export type IconConfig = {
  component: FC<IconProps>;
  color: string;
};

export const icons: Record<string, IconConfig> = {
  github: { component: GithubIcon, color: "#181717" },
  linkedin: { component: LinkedinIcon, color: "#0A66C2" },
  instagram: { component: InstagramIcon, color: "#E4405F" },
  telegram: { component: TelegramIcon, color: "#26A5E4" },
  whatsapp: { component: WhatsappIcon, color: "#25D366" },
  python: { component: PythonIcon, color: "#3776AB" },
  flask: { component: FlaskIcon, color: "#000000" },
  postgresql: { component: PostgresqlIcon, color: "#4169E1" },
  docker: { component: DockerIcon, color: "#2496ED" },
  nodejs: { component: NodejsIcon, color: "#68A063" },
  react: { component: ReactIcon, color: "#61DAFB" },
  firebase: { component: FirebaseIcon, color: "#FFCA28" },
  d3js: { component: D3Icon, color: "#F9A03C" },
  tensorflow: { component: TensorflowIcon, color: "#FF6F00" },
};
