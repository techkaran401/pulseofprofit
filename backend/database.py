import os
from typing import Dict, Any, List, Optional
import pymongo
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "pulse_of_profit")

class MongoManager:
    def __init__(self):
        self.client: Optional[MongoClient] = None
        self.db = None
        self.is_connected = False
        self.in_memory_posts: List[Dict[str, Any]] = []
        self.in_memory_users: List[Dict[str, Any]] = []
        self.in_memory_admins: List[Dict[str, Any]] = []
        self.in_memory_reports: List[Dict[str, Any]] = []
        self.in_memory_profiles: Dict[str, Dict[str, Any]] = {}
        self.connect()

    def connect(self):
        try:
            self.client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=2000)
            # Test connection
            self.client.admin.command('ping')
            self.db = self.client[DB_NAME]
            self.is_connected = True
            print(f"Connected to MongoDB at {MONGO_URI}, database: {DB_NAME}")
        except Exception as e:
            print(f"MongoDB connection warning: {e}. Falling back to in-memory store for seamless operation.")
            self.is_connected = False
            self.db = None
            self._seed_in_memory()

    def _seed_in_memory(self):
        if not self.in_memory_users:
            self.in_memory_users = [
                {
                    "email": "shobin@pulseofprofit.io",
                    "name": "Shobin Sheikh",
                    "mob_no": "+91 9876543210",
                    "hashed_password": "pbkdf2:sha256:...",
                    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Shobin",
                    "bio": "Lead Market Analyst & Pulse of Profit Founder",
                    "role": "admin",
                    "is_blocked": False,
                    "created_at": "2026-04-15"
                },
                {
                    "email": "techkaran401@gmail.com",
                    "name": "Karan",
                    "mob_no": "+91 9876543211",
                    "hashed_password": "pbkdf2:sha256:...",
                    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Karan",
                    "bio": "Interested in financial markets, business analysis, and global economy updates.",
                    "role": "admin",
                    "is_blocked": False,
                    "created_at": "2026-04-20"
                },
                {
                    "email": "rohit@example.com",
                    "name": "Rohit Sharma",
                    "mob_no": "+91 9876543212",
                    "hashed_password": "pbkdf2:sha256:...",
                    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit",
                    "bio": "Equity Trader & Momentum Specialist",
                    "role": "user",
                    "is_blocked": False,
                    "created_at": "2026-04-22"
                },
                {
                    "email": "anjali@example.com",
                    "name": "Anjali Gupta",
                    "mob_no": "+91 9876543213",
                    "hashed_password": "pbkdf2:sha256:...",
                    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
                    "bio": "Macro-economic enthusiast",
                    "role": "user",
                    "is_blocked": False,
                    "created_at": "2026-04-25"
                }
            ]

        if not self.in_memory_reports:
            self.in_memory_reports = [
                {
                    "id": "rep_1",
                    "post_id": "3",
                    "post_title": "PULSE OF PROFIT BULLETIN 🗞️ (22 April 2026)",
                    "reported_by": "anjali@example.com",
                    "reason": "Unverified financial rumor in comments",
                    "status": "pending",
                    "timestamp": "2026-04-26 14:30"
                }
            ]
        if not self.in_memory_posts:
            self.in_memory_posts = [
                {
                    "id": "1",
                    "title": "PULSE OF PROFIT BULLETIN 🗞️",
                    "date": "27 April 2026",
                    "author": "SHOBIN SHEIKH",
                    "content": "Welcome to today's Pulse of Profit Bulletin. Telegram channel link: https://t.me/PulseOfProfitnews. We cover the latest market updates, stock analyses, and financial news daily. Stay tuned for the market opening report and key levels to watch out for today.",
                    "likes": 12,
                    "reposts": 5,
                    "comments_count": 2,
                    "comments": [
                        {
                            "id": "c1",
                            "author": "Rohit Sharma",
                            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit",
                            "content": "Great insights on the Telegram channel. Will keep following!",
                            "timestamp": "2 hours ago"
                        },
                        {
                            "id": "c2",
                            "author": "Anjali Gupta",
                            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
                            "content": "Very informative post, looking forward to the next bulletin.",
                            "timestamp": "4 hours ago"
                        }
                    ],
                    "imageUrl": None,
                    "liked_by": [],
                    "reposted_by": []
                },
                {
                    "id": "2",
                    "title": "PULSE OF PROFIT BULLETIN 🗞️",
                    "date": "23rd April 2026",
                    "author": "SHOBIN SHEIKH",
                    "content": "“The next global order may be built by ‘connectors’ in a fragmented world. This opens up an opportunity for India to be a ‘connector economy’.” ~ Anand Mahindra, Chairman, M&M. Check out the Chairman's Message brochure page attached below for a detailed overview.",
                    "likes": 3,
                    "reposts": 2,
                    "comments_count": 2,
                    "comments": [
                        {
                            "id": "c3",
                            "author": "Shobin Sheikh",
                            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Shobin",
                            "content": "Anand Mahindra's quote perfectly captures the shift in India's global position. A connector economy is exactly what we are becoming.",
                            "timestamp": "1 day ago"
                        },
                        {
                            "id": "c4",
                            "author": "Vikram Aditya",
                            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
                            "content": "The two-page Chairman's message is a must-read for any retail investor.",
                            "timestamp": "2 days ago"
                        }
                    ],
                    "imageUrl": "/chairman_message.png",
                    "liked_by": [],
                    "reposted_by": []
                },
                {
                    "id": "3",
                    "title": "PULSE OF PROFIT BULLETIN 🗞️",
                    "date": "22 April 2026",
                    "author": "SHOBIN SHEIKH",
                    "content": "Date: April 22, 2026. Telegram link: https://t.me/PulseOfProfitnews. In today's edition, we analyze the earnings release of top IT companies and discuss the potential impact on banking stocks. Follow for more daily briefs.",
                    "likes": 45,
                    "reposts": 12,
                    "comments_count": 0,
                    "comments": [],
                    "imageUrl": None,
                    "liked_by": [],
                    "reposted_by": []
                }
            ]

mongo_manager = MongoManager()

def init_db():
    if mongo_manager.is_connected and mongo_manager.db is not None:
        try:
            # Seed mongo posts collection if empty
            posts_col = mongo_manager.db["posts"]
            if posts_col.count_documents({}) == 0:
                initial_posts = [
                    {
                        "id": "1",
                        "title": "PULSE OF PROFIT BULLETIN 🗞️",
                        "date": "27 April 2026",
                        "author": "SHOBIN SHEIKH",
                        "content": "Welcome to today's Pulse of Profit Bulletin. Telegram channel link: https://t.me/PulseOfProfitnews. We cover the latest market updates, stock analyses, and financial news daily. Stay tuned for the market opening report and key levels to watch out for today.",
                        "likes": 12,
                        "reposts": 5,
                        "comments_count": 2,
                        "comments": [
                            {
                                "id": "c1",
                                "author": "Rohit Sharma",
                                "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit",
                                "content": "Great insights on the Telegram channel. Will keep following!",
                                "timestamp": "2 hours ago"
                            },
                            {
                                "id": "c2",
                                "author": "Anjali Gupta",
                                "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
                                "content": "Very informative post, looking forward to the next bulletin.",
                                "timestamp": "4 hours ago"
                            }
                        ],
                        "imageUrl": None,
                        "liked_by": [],
                        "reposted_by": [],
                        "created_at": datetime.now()
                    },
                    {
                        "id": "2",
                        "title": "PULSE OF PROFIT BULLETIN 🗞️",
                        "date": "23rd April 2026",
                        "author": "SHOBIN SHEIKH",
                        "content": "“The next global order may be built by ‘connectors’ in a fragmented world. This opens up an opportunity for India to be a ‘connector economy’.” ~ Anand Mahindra, Chairman, M&M. Check out the Chairman's Message brochure page attached below for a detailed overview.",
                        "likes": 3,
                        "reposts": 2,
                        "comments_count": 2,
                        "comments": [
                            {
                                "id": "c3",
                                "author": "Shobin Sheikh",
                                "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Shobin",
                                "content": "Anand Mahindra's quote perfectly captures the shift in India's global position. A connector economy is exactly what we are becoming.",
                                "timestamp": "1 day ago"
                            },
                            {
                                "id": "c4",
                                "author": "Vikram Aditya",
                                "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
                                "content": "The two-page Chairman's message is a must-read for any retail investor.",
                                "timestamp": "2 days ago"
                            }
                        ],
                        "imageUrl": "/chairman_message.png",
                        "liked_by": [],
                        "reposted_by": [],
                        "created_at": datetime.now()
                    },
                    {
                        "id": "3",
                        "title": "PULSE OF PROFIT BULLETIN 🗞️",
                        "date": "22 April 2026",
                        "author": "SHOBIN SHEIKH",
                        "content": "Date: April 22, 2026. Telegram link: https://t.me/PulseOfProfitnews. In today's edition, we analyze the earnings release of top IT companies and discuss the potential impact on banking stocks. Follow for more daily briefs.",
                        "likes": 45,
                        "reposts": 12,
                        "comments_count": 0,
                        "comments": [],
                        "imageUrl": None,
                        "liked_by": [],
                        "reposted_by": [],
                        "created_at": datetime.now()
                    }
                ]
                posts_col.insert_many(initial_posts)
                print("Seeded MongoDB with initial posts.")

            users_col = mongo_manager.db["users"]
            users_col.create_index("email", unique=True)
        except Exception as e:
            print(f"Error during init_db: {e}")
