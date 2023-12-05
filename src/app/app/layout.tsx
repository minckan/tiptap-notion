export default function AppLayout(props: { children: React.ReactNode }) {
  return <main className="flex min-h-screen flex-col">{props.children}</main>;
}
