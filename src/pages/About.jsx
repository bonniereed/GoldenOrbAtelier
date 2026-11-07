import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsEnvelopeAt, BsClock, BsGeoAlt, BsUpload, BsCheckLg, BsInstagram } from "react-icons/bs";
import PageBanner from "../components/PageBanner";
import { useReveal } from "../hooks/useReveal";
import {
  EMAIL_HREF, EMAIL_DISPLAY,
  BOOKING_EMBED_URL,
  BOOKING_FORM_URL,
  STUDIO_ADDRESS,
  mapsLink,
  INSTAGRAM_URL, INSTAGRAM_HANDLE,
} from "../constants/company";
import "../styles/booking.css";

const SIZE_OPTIONS      = ["2-4 Inches", "4-5 Inches", "6+ Inches"];
const STYLE_OPTIONS     = ["Color", "Blackwork", "A mix of both"];
const VARIATION_OPTIONS = ["No", "Add Glitter", "Patchwork"];

const MAX_PHOTOS = 3;
const MAX_TOTAL_BYTES = 24 * 1024 * 1024; // Forminit allows 25 MB per submission

// Shrink phone photos so 3 of them comfortably fit under the upload limit.
async function compressImage(file, maxSide = 1800, quality = 0.82) {
  try {
    const bitmap = await createImageBitmap(file);
    const scale  = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width  = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((res) => canvas.toBlob(res, "image/jpeg", quality));
    if (!blob || blob.size >= file.size) return file;
    const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], name, { type: "image/jpeg" });
  } catch {
    return file; // browser couldn't decode it (e.g. some HEIC files), so send the original
  }
}

const isImage = (f) => f.type.startsWith("image/") || /\.(heic|heif)$/i.test(f.name);

function Label({ htmlFor, children, optional, as: Tag = "label" }) {
  return (
    <Tag className="bk-label" {...(htmlFor ? { htmlFor } : {})}>
      {children}
      {optional ? <span className="bk-opt">Optional</span> : <span className="bk-req" aria-hidden="true">*</span>}
    </Tag>
  );
}

function Choices({ name, label, options }) {
  return (
    <fieldset className="bk-field" style={{ border: 0 }}>
      <Label as="legend">{label}</Label>
      <div className="bk-choices" style={{ marginTop: "0.45rem" }}>
        {options.map((o) => (
          <label key={o} className="bk-choice">
            <input type="radio" name={name} value={o} required />
            <span>{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Section({ num, title, desc, children, required }) {
  return (
    <section className="bk-section">
      <div className="bk-section__num" aria-hidden="true">{num}</div>
      <div className="bk-section__body">
        <div>
          <h3 className="bk-section__title">
            {title}
            {required && <span className="bk-req" aria-hidden="true" style={{ fontFamily: "var(--font-sans)", fontSize: "1rem" }}>*</span>}
          </h3>
          {desc && <p className="bk-section__desc">{desc}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export default function About() {
  const contentRef = useReveal();
  const formRef    = useRef(null);
  const pickerRef  = useRef(null);
  const dropRef    = useRef(null);
  const { search } = useLocation();
  const sent       = new URLSearchParams(search).get("sent") === "1";
  const map        = mapsLink();
  const navigate   = useNavigate();

  const [photos, setPhotos]         = useState([]); // [{ file, url }]
  const [photoError, setPhotoError] = useState("");
  const [dragOver, setDragOver]     = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sendError, setSendError]   = useState(false);

  const addFiles = (list) => {
    const picked = Array.from(list || []).filter(isImage);
    setPhotoError("");
    setPhotos((prev) => {
      const room = MAX_PHOTOS - prev.length;
      if (picked.length > room) setPhotoError(`You can add up to ${MAX_PHOTOS} photos.`);
      return [...prev, ...picked.slice(0, room).map((file) => ({ file, url: URL.createObjectURL(file) }))];
    });
  };

  const removePhoto = (i) => {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[i].url);
      return prev.filter((_, j) => j !== i);
    });
    setPhotoError("");
  };

  const openPicker = () => pickerRef.current?.click();

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form.reportValidity()) return;
    if (photos.length < 1) {
      setPhotoError("Please add at least one reference photo.");
      dropRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      dropRef.current?.focus({ preventScroll: true });
      return;
    }

    setSubmitting(true);
    setSendError(false);
    const files = await Promise.all(photos.map((p) => compressImage(p.file)));
    const total = files.reduce((sum, f) => sum + f.size, 0);
    if (total > MAX_TOTAL_BYTES) {
      setSubmitting(false);
      setPhotoError("Those photos are too large to send together (25 MB max). Try smaller or fewer photos.");
      return;
    }

    // Send in the background so the visitor stays here: on success show the
    // thank-you message, on failure keep their answers and offer email instead.
    const data = new FormData(form);
    files.forEach((f) => data.append("fi-file-reference_photos[]", f, f.name));
    try {
      const res = await fetch(BOOKING_FORM_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(60000),
      });
      if (!res.ok) throw new Error(`Form service responded ${res.status}`);
      navigate("/about?sent=1");
    } catch (err) {
      console.error("Booking request failed:", err);
      setSendError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageBanner
        title="Contact Me"
      />

      {/* ── Calendar booking embed ── */}
      {BOOKING_EMBED_URL && (
        <div className="booking-embed">
          <div className="booking-embed__header">
            <p className="booking-embed__eyebrow">Book a Session</p>
            <h2 className="booking-embed__heading">Pick a Time</h2>
          </div>
          <iframe
            src={BOOKING_EMBED_URL}
            className="booking-embed__frame"
            frameBorder="0"
            title="Book an appointment"
            allow="payment"
          />
        </div>
      )}

      <div ref={contentRef} className="bk-wrap reveal">
        {/* ── Contact strip ── */}
        <div className="bk-contact">
          <span className="bk-contact__item"><BsEnvelopeAt /><a href={EMAIL_HREF}>{EMAIL_DISPLAY}</a></span>
          <span className="bk-contact__item"><BsInstagram /><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">{INSTAGRAM_HANDLE}</a></span>
          <span className="bk-contact__item"><BsClock />Appointment Only</span>
          <span className="bk-contact__item">
            <BsGeoAlt />
            <a
              href={map.href}
              {...(map.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="bk-contact__map"
              aria-label={`Open ${STUDIO_ADDRESS} in your maps app`}
            >
              {STUDIO_ADDRESS}
            </a>
          </span>
        </div>

        <div className="bk-card">
          {sent ? (
            <div className="bk-success" role="status">
              <div className="bk-success__icon"><BsCheckLg /></div>
              <h2>Thank You!</h2>
              <p>Your booking request is on its way. I read every request personally and will be in touch soon to talk through your idea and find a time.</p>
              <Link to="/faq" className="btn btn--ghost">Read the FAQ while you wait</Link>
            </div>
          ) : (
            <>
              <div className="bk-card__head">
                <h2 className="bk-card__title">Book Your Tattoo</h2>
                <p className="bk-card__intro">
                  Tell me about the piece you have in mind. I read every request personally and will
                  reach out to talk through your idea and find a time.
                </p>
                <p className="bk-card__req"><span className="bk-req">*</span> Required</p>
              </div>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bk-form"
                noValidate
              >
                {/* Spam trap: real visitors never fill this in */}
                <input type="text" name="_gotcha" className="bk-hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                <Section num="I" title="About You" desc="How I can reach you.">
                  <div className="bk-grid">
                    <div className="bk-field" style={{ gridColumn: "1 / -1" }}>
                      <Label htmlFor="name">Name</Label>
                      <input id="name" name="fi-text-name" type="text" required autoComplete="name" className="bk-input" placeholder="First and last name" />
                    </div>
                    <div className="bk-field">
                      <Label htmlFor="email">Email</Label>
                      <input id="email" name="fi-sender-email" type="email" required autoComplete="email" className="bk-input" placeholder="you@email.com" />
                    </div>
                    <div className="bk-field">
                      <Label htmlFor="phone">Phone Number</Label>
                      <input id="phone" name="fi-text-phone" type="tel" required autoComplete="tel" className="bk-input" placeholder="(555) 000-0000" />
                    </div>
                  </div>
                </Section>

                <Section num="II" title="Your Tattoo" desc="The more detail, the better.">
                  <div className="bk-field">
                    <Label htmlFor="idea">Tattoo Idea</Label>
                    <textarea id="idea" name="fi-text-tattoo_idea" required className="bk-input" placeholder="Subject, mood, any elements you'd love to include, things you'd like to avoid..." />
                  </div>
                  <div className="bk-field">
                    <Label htmlFor="placement">Location on the Body</Label>
                    <input id="placement" name="fi-text-placement" type="text" required className="bk-input" placeholder="e.g. outer left forearm, back of calf" />
                  </div>
                  <Choices name="fi-radio-size"       label="Roughly how many inches?" options={SIZE_OPTIONS} />
                  <Choices name="fi-radio-style"      label="Style"                    options={STYLE_OPTIONS} />
                  <Choices name="fi-radio-variations" label="Variations"               options={VARIATION_OPTIONS} />
                </Section>

                <Section
                  num="III"
                  title="Reference Photos"
                  required
                  desc="Add 1 to 3 images: inspiration, the placement spot, or anything that helps me see your vision."
                >
                  {photos.length < MAX_PHOTOS && (
                    <button
                      type="button"
                      ref={dropRef}
                      className={"bk-drop" + (dragOver ? " bk-drop--over" : "")}
                      onClick={openPicker}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={onDrop}
                    >
                      <span className="bk-drop__icon"><BsUpload /></span>
                      <span className="bk-drop__main">Drag photos here or <u>browse</u></span>
                      <span className="bk-drop__sub">
                        {photos.length === 0 ? "JPG, PNG or HEIC · up to 3 photos" : `${MAX_PHOTOS - photos.length} more allowed`}
                      </span>
                    </button>
                  )}
                  <input ref={pickerRef} type="file" accept="image/*" multiple className="bk-hidden" tabIndex={-1}
                         onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />

                  {photos.length > 0 && (
                    <div className="bk-thumbs">
                      {Array.from({ length: MAX_PHOTOS }, (_, i) => photos[i] ? (
                        <div key={photos[i].url} className="bk-thumb">
                          <img src={photos[i].url} alt={`Reference photo ${i + 1}`} />
                          <span className="bk-thumb__n">{i + 1}</span>
                          <button type="button" className="bk-thumb__remove" onClick={() => removePhoto(i)} aria-label={`Remove photo ${i + 1}`}>✕</button>
                        </div>
                      ) : (
                        <button key={`empty-${i}`} type="button" className="bk-thumb bk-thumb--empty" onClick={openPicker}>
                          + Photo {i + 1}
                        </button>
                      ))}
                    </div>
                  )}
                  {photoError && <p className="bk-error" role="alert">{photoError}</p>}
                </Section>

                <Section num="IV" title="Final Details" desc="Anything else I should know.">
                  <div className="bk-field">
                    <Label htmlFor="allergies" optional>Allergies?</Label>
                    <input id="allergies" name="fi-text-allergies" type="text" className="bk-input" placeholder="Nuts, adhesives, etc." />
                  </div>
                  <div className="bk-field">
                    <Label htmlFor="questions" optional>Any questions for me?</Label>
                    <textarea id="questions" name="fi-text-questions" className="bk-input bk-input--short" placeholder="Ask away!" />
                  </div>
                </Section>

                <div className="bk-submit">
                  <button type="submit" className="bk-btn" disabled={submitting}>
                    {submitting ? "Sending..." : "Send Booking Request"}
                  </button>
                  {sendError && (
                    <p className="bk-error" role="alert">
                      We couldn&rsquo;t send your request right now &mdash; your answers are still here.
                      Please try again in a few minutes, or email your request and reference photos
                      to <a href={EMAIL_HREF}>{EMAIL_DISPLAY}</a>.
                    </p>
                  )}
                  <p className="bk-submit__note">
                    Trouble sending? Email us at <a href={EMAIL_HREF}>{EMAIL_DISPLAY}</a>.
                  </p>
                  <p className="bk-submit__note">
                    A nonrefundable $100 deposit is required to book your appointment.
                    See the <Link to="/faq">FAQ</Link> for pricing and policies.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
