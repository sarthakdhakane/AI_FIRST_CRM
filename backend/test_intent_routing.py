from types import SimpleNamespace
import unittest
from unittest.mock import patch

from app.agent import graph
from app.agent.tools import intent_classifier


class IntentRoutingTests(unittest.TestCase):
    def test_classifier_normalizes_only_allowed_intents(self):
        cases = (
            ("  ExTrAcT  ", "extract"),
            ("None of the above intents match the user request.", "unknown"),
            ("extract because this is an interaction", "unknown"),
            ("", "unknown"),
        )

        for raw_response, expected_intent in cases:
            fake_llm = SimpleNamespace(
                invoke=lambda _messages, raw=raw_response: SimpleNamespace(content=raw)
            )
            with patch.object(intent_classifier, "llm", fake_llm):
                self.assertEqual(
                    intent_classifier.classify_intent("test"), expected_intent
                )

    def test_arbitrary_intent_routes_to_unknown_handler(self):
        with patch.object(
            graph,
            "classify_intent",
            return_value="None of the above intents match the user request.",
        ):
            result = graph.graph.invoke(
                {
                    "user_message": "Hello",
                    "intent": "",
                    "extracted_data": {},
                    "response": None,
                }
            )

        self.assertEqual(result["intent"], "unknown")
        self.assertEqual(result["response"], graph.UNKNOWN_INTENT_RESPONSE)
        self.assertEqual(graph.route({"intent": "arbitrary LLM text"}), "unknown")
