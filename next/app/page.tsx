import SimpleButton from "./components/SimpleButton";

export default function Home() {
  return (
    <div className="p-5 flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold">Hello World</h1>
      <SimpleButton text={"ここをクリック"} />
    </div>
  );
}
