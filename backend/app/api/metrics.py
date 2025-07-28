from fastapi import APIRouter

router = APIRouter()

@router.get("/metrics")
def get_metrics():
    return [
        {"name": "Website Visitors", "value": "5.2K"},
        {"name": "Conversions", "value": "320"},
        {"name": "Ad Spend", "value": "$1.4K"},
        {"name": "CTR", "value": "2.4%"},
        {"name": "Leads", "value": "97"},
    ]