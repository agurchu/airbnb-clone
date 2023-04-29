export default function AddressLink({ children, className = null }) {
  if (!className) {
    className = " block my-2";
  }
  className += "underline font-semibold";

  return (
    <a
      className={className}
      target="_blank"
      href={"https://maps.google.com/?q=" + children}
    >
      {children}
    </a>
  );
}
