import { Link } from "react-router-dom";
import PageBanner from "../components/PageBanner";
import { useReveal } from "../hooks/useReveal";

// Each section groups related questions. Each answer is a list of paragraphs;
// a paragraph can also be { list: [...] } or { steps: [...] } for bullets / numbered steps.
const FAQ_SECTIONS = [
  {
    title: "Pricing & Payment",
    items: [
      {
        q: "How much do tattoos cost?",
        a: [
          "Pricing is $150 an hour. All quotes on pieces when booking are estimates.",
          "If your tattoo goes over on time for any reason, the price of the tattoo will be adjusted accordingly. I will always do my best to stay on time with your work and I will ask for verbal confirmation to proceed beyond our planned time if we need it.",
        ],
      },
      {
        q: "Is there a shop minimum?",
        a: ["Shop minimum is $125 unless the tattoo is a discounted flash piece."],
      },
      {
        q: "Do I need a deposit?",
        a: [
          "A nonrefundable $100 deposit is required to book your appointment. This deposit goes toward the total cost of your tattoo and will be deducted from the final amount due at the end of your session. If a deposit is not made, any appointment is forfeited.",
        ],
      },
      {
        q: "What forms of payment do you accept?",
        a: [
          "Deposits can be paid via booking link with a card, or in person with cash. Payment due after your appointment can be accepted as debit, credit, or cash. Afterpay is offered as a buy now, pay later method.",
        ],
      },
      {
        q: "Do you offer Afterpay?",
        a: [
          "Yes! Afterpay is a great way to make larger works affordable for my clients and I'm excited to be able to offer it to you! Afterpay allows you to break up the cost of your tattoo into smaller, manageable payments rather than paying the entire balance at once.",
          "Pay in 4 (up to $2,000): splits your purchase into 4 interest-free installments with the first payment due at checkout. The remaining 3 payments are made every two weeks.",
        ],
      },
      {
        q: "How do I use Afterpay?",
        a: [
          {
            steps: [
              "Before your appointment, please download the Afterpay app & create your account. Check your available spending limit to make sure it can accommodate your anticipated tattoo balance.",
              "Let me know ahead of time! This allows me to prepare the appropriate payment method for a smooth checkout experience.",
              "The standard deposit is still required to secure your appointment & will be deducted from your remaining balance.",
              "When we're finished, I'll send you a Square invoice directly to your email for the remaining balance. Open the invoice, select \"Afterpay\" as the payment method, follow the prompts to sign in and complete the transaction. Once the payment has been approved and processed, you're good to go!",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Booking & Policies",
    items: [
      {
        q: "What is your cancellation policy?",
        a: [
          "A minimum of 48 hours prior notice is required to reschedule, or you forfeit your deposit and a new deposit will be required to reschedule, unless otherwise specified by me and fully dependent on circumstances.",
        ],
      },
      {
        q: "What if I'm running late?",
        a: [
          "Please let me know if you are running late for an appointment. If you are more than 15 minutes late, you will be considered a no show, your appointment will be cancelled and your deposit forfeited.",
        ],
      },
      {
        q: "Can I bring a guest?",
        a: [
          "One guest is permitted in the studio. No additional guests unless otherwise permitted by me. If you are getting a matching tattoo, the second person counts as your one guest.",
        ],
      },
      {
        q: "What is the minimum age?",
        a: ["Minimum age to be tattooed is 18 years old. No children are allowed in the studio."],
      },
      {
        q: "Can I see my design before my appointment?",
        a: [
          "Designs will not be shown prior to your appointment unless you are traveling and it is deemed necessary by me. Every appointment is made with time at the beginning to go over your design and make any adjustments together.",
        ],
      },
      {
        q: "What if I have a sunburn or other skin damage?",
        a: [
          "Do not show up to your appointment with any skin damage such as sunburn, scratches, bruising etc. You will be turned away and asked to reschedule, as this increases the likelihood of infection and poses a risk to your health.",
        ],
      },
    ],
  },
  {
    title: "Flash & Touch Ups",
    items: [
      {
        q: "How do I claim a flash design?",
        a: [
          "Flash designs will always be posted with sizing and full price to claim. ALL flash designs require a deposit within 5 days of reserving it, otherwise it will not be held for you.",
        ],
      },
      {
        q: "Are touch ups free?",
        a: [
          "Every tattoo is allowed one free touch up within 12 months of getting your tattoo. Touch ups are only for touching up the existing piece. Any additions or changes to the tattoo under the premise of a touch up will be charged the shop minimum of $125.",
        ],
      },
    ],
  },
  {
    title: "Appointment Prep",
    items: [
      {
        q: "How should I prepare for my appointment?",
        a: [
          "Yay! You've picked your design, chosen your artist, paid your deposit and now your tattoo appointment is right around the corner! So, how can you make sure you're ready for the big day?",
          {
            list: [
              "Take care of yourself! Get a good night's sleep, stay well hydrated, and make sure you've had a proper meal before arriving. Getting tattooed can take a lot out of you, and a well rested, well fed body makes for a much better tattoo experience.",
              "Dress for comfort! Wear loose, comfortable clothing that allows easy access to the area we'll be tattooing. Keep in mind that tattoo ink can stain, so leave your favorite outfit at home.",
              "For longer sessions, pack a tattoo-day survival bag! I recommend snacks, drinks, a cozy blanket and some entertainment to keep you busy, like a book, Kindle, handheld video gaming device or whatever your favorite pastime may be.",
              "Headphones are always a great choice, especially for noise sensitive or easily overstimulated people.",
            ],
          },
        ],
      },
    ],
  },
];

function Answer({ parts }) {
  return parts.map((part, i) => {
    if (typeof part === "string") return <p key={i}>{part}</p>;
    if (part.steps) return <ol key={i}>{part.steps.map((s, j) => <li key={j}>{s}</li>)}</ol>;
    if (part.list)  return <ul key={i}>{part.list.map((s, j) => <li key={j}>{s}</li>)}</ul>;
    return null;
  });
}

export default function FAQ() {
  const revealRef = useReveal();
  return (
    <>
      <PageBanner
        title="FAQ"
        subtitle="Policies, Pricing & Prep"
      />
      <div ref={revealRef} className="faq-page reveal">
        {FAQ_SECTIONS.map((section) => (
          <section key={section.title} className="faq-section">
            <h2 className="faq-section__title">{section.title}</h2>
            <div className="faq-list">
              {section.items.map(({ q, a }) => (
                <details key={q} className="faq-item">
                  <summary className="faq-item__q">{q}</summary>
                  <div className="faq-item__a">
                    <Answer parts={a} />
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}

        <div className="faq-cta">
          <p>Still have a question?</p>
          <Link to="/about" className="btn btn--primary">Get in Touch</Link>
        </div>
      </div>
    </>
  );
}
