export default function SubHeading({ title, description }) {
  return (
    <>
      <h2 className="text-2xl mt-4">{title}</h2>
      <p className="text-gray-500 text-sm">{description}</p>
    </>
  );
}
