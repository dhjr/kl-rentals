function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 text-center border-t border-slate-800">
      <div className="container mx-auto px-4">
        <p>
          &copy; {new Date().getFullYear()} KL Rentals. All rights reserved.
        </p>
        <p className="text-slate-500 text-sm mt-2">
          Premium car rentals for everyone.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
