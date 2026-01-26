import AdminLayout from "./layout";

export default function News() {
  return <div>list news</div>;
}

News.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
