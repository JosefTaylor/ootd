import React from "react";
import Card from "../components/Card.jsx";

export default function About() {
  return (
    <Card className="medium" title="Welcome!">
      <p>
        Outfit Of The Day is a tool to help you understand your wardrobe and
        your fashion consumption habits.
      </p>
      <p>
        Together, we can find out how much your clothes cost each time you wear
        them - that denim jacket might have cost a lot, but you wear it every
        day. The faux-alligator cowboy boots, on the other hand, aren&apos;t
        earning their keep.
      </p>
      <p>
        More than that, Outfit Of The Day can help you set goals about how you
        want to interface with fashion. You might find that you tire of clothing
        after a season; does that mean you should lean into the used market so
        that each piece is a little less dear, or that you should spend more
        time thinking about a big purchase to avoid getting swept up in the
        latest fad?
      </p>
      <p>Happy dressing!</p>
      <p>
        Brought to you by{" "}
        <a rel="me" href="https://www.joseftaylor.com">
          Josef Taylor
        </a>
      </p>
    </Card>
  );
}
