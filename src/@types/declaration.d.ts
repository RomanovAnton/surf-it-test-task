declare module "*.svg" {
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*.scss" {
  const content: any;
  export default content;
}
