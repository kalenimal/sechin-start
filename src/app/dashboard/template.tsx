/** Re-mounts on every dashboard navigation, giving each screen a short entrance animation. */
export default function DashboardTemplate({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
