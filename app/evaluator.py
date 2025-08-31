import math

def evaluate_expression(expr: str):
    # allowed safe functions
    allowed_names = {
        k: v for k, v in math.__dict__.items() if not k.startswith("__")
    }
    allowed_names["abs"] = abs
    allowed_names["round"] = round

    # replace ^ with ** for power
    expr = expr.replace("^", "**")

    return eval(expr, {"__builtins__": {}}, allowed_names)
