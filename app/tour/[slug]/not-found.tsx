import Link from "next/link";

export default function TourNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-md p-6">
        <h2 className="text-3xl font-bold mb-3">Tour Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The tour you are looking for does not exist or may have been removed.
        </p>
        <Link
          href="/#tours"
          className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium rounded-md inline-block"
        >
          Explore Our Tours
        </Link>
      </div>
    </div>
  );
}
