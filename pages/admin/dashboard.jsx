import AdminLayout from './layout'
export default function Dashboard() {
  return (
    <div>D</div>
  )
}

Dashboard.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};