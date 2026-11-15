const SETMORE_URL = "https://royaltybeautyxdvp.setmore.com";

export function BookingForm() {
  return (
    <div className="bg-card border border-border p-4 lg:p-6">
      <div className="relative w-full overflow-hidden border border-border" style={{ height: "780px" }}>
        <iframe
          title="Book an appointment"
          src={SETMORE_URL}
          className="w-full h-full"
          loading="lazy"
        />
      </div>
    </div>
  );
}
