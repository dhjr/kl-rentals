function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 text-center">
      <div className="container mx-auto px-4">
        <p>
          &copy; {new Date().getFullYear()} KL Rentals. All rights reserved.
        </p>
        <p className="text-sm mt-2">Premium car rentals for everyone.</p>
      </div>
    </footer>
  );
}

export default Footer;
