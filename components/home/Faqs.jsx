import FaqsCard from "./FaqsCard";

const Faqs = () => {
  const faqsData = [
    {
      question: "Is jsDreamers free?",
      answer:
        "jsDreamers is meant to serve as a completely free resource for learning JavaScript and its intricacies. It's all free.",
    },
    {
      question: "How can I contribute?",
      answer:
        "You can contribute by submitting tutorials, writing articles, or sharing coding challenges with the community.",
    },
    {
      question: "Is there a premium version?",
      answer:
        "No, jsDreamers is completely free. There are no premium versions or hidden costs.",
    },
  ];

  return (
    <section className="m-auto mt-20">
      <h3 className="font-bold text-[2.2rem] text-center mb-2">
        Frequently Asked Questions
      </h3>
      <div className="container flex flex-col gap-4">
        {faqsData.map((faq, index) => (
          <FaqsCard key={index} id={`accordion-${index}`} {...faq} />
        ))}
      </div>
    </section>
  );
};

export default Faqs;
