export default function Logo(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img src="/logo.svg" alt="logo" {...props} />
  );
}
