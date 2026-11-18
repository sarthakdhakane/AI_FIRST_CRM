import asyncio
import json
import unittest
from unittest.mock import patch

from app.api.routes import chat
from app.agent.tools.log_interaction import _parse_interaction_response
from app.schemas.chat import ChatRequest


class LogInteractionSchemaTests(unittest.TestCase):
    def test_complete_extraction_payload_is_returned_with_all_fields(self):
        payload = {
            "hcpName": "Dr. Amit Sharma",
            "interactionType": "Face-to-face Product Detailing Meeting",
            "interactionDate": "15 July 2026",
            "interactionTime": "10:30 AM",
            "attendees": "Dr. Amit Sharma, Govind Dhakane, Nurse Priya Kulkarni",
            "topicsDiscussed": "CardioX, Phase III Clinical Trial Results",
            "voiceSummary": "Discussion about CardioX and its clinical evidence.",
            "materialsShared": "2 Product Brochures, 1 Clinical Evidence Booklet, 1 Dosage Guide",
            "samplesDistributed": "3 CardioX Sample Packs",
            "sentiment": "Positive",
            "outcomes": "Doctor agreed to evaluate CardioX.",
            "followUpActions": "Send research paper and schedule a meeting.",
            "aiSuggestedFollowUps": ["Send the requested clinical evidence."],
        }

        result = _parse_interaction_response(json.dumps(payload))

        self.assertEqual(result, payload)
        self.assertEqual(set(result), set(payload))
        self.assertIsInstance(result["aiSuggestedFollowUps"], list)

    def test_omitted_fields_receive_frontend_safe_defaults(self):
        result = _parse_interaction_response('{"hcpName": "Dr. Amit Sharma"}')

        self.assertEqual(result["interactionType"], "")
        self.assertEqual(result["aiSuggestedFollowUps"], [])
        self.assertEqual(len(result), 13)

    def test_chat_endpoint_returns_the_complete_extraction_payload(self):
        payload = _parse_interaction_response('{"hcpName": "Dr. Amit Sharma"}')

        with patch("app.api.routes.process_message", return_value=payload):
            response = asyncio.run(chat(ChatRequest(message="I met Dr. Amit Sharma.")))

        self.assertEqual(response, payload)
        self.assertEqual(len(response), 13)


if __name__ == "__main__":
    unittest.main()
