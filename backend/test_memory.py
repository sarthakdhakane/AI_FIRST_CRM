from app.agent.memory import save_interaction
from app.agent.memory import get_interaction
from app.agent.memory import update_interaction

save_interaction({
    "hcpName": "Dr Rahul Sharma",
    "topicsDiscussed": "CardioX",
})

print(get_interaction())

update_interaction(
    "hcpName",
    "Dr Amit Sharma",
)

print(get_interaction())