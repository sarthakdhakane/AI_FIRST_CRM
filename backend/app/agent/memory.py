# Stores the latest interaction in memory

current_interaction = {}


def save_interaction(data):
    global current_interaction
    current_interaction = data


def get_interaction():
    return current_interaction


def update_interaction(field, value):
    global current_interaction

    if field in current_interaction:
        current_interaction[field] = value