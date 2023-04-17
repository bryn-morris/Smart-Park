#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db

from models import db, Many1, Many2, SampleJoin

with app.app_context():

    faker = Faker()

    print("Deleting data...")
    Many1.query.delete()
    Many2.query.delete()
    SampleJoin.query.delete()

    print("Creating Many1s...")

    Many1s_list = [Many1(topic = faker.sentence(), year = faker.year(), page_count = random.randint(1,10)) for _ in range(1,20)]

    print("Creating Many2s...")

    Many2s_list = [Many2(topic = faker.sentence(), year = faker.year(), page_count = random.randint(1,10)) for _ in range(1,20)]

    print("Creating SampleJoins...")

    SampleJoin_list = [SampleJoin(many1_id = random.randint(1,20), many2_id = random.randint(1,20)) for _ in range(1,30)]
    
    db.session.add_all(Many2s_list)
    db.session.add_all(Many1s_list)
    db.session.add_all(SampleJoin_list)
    db.session.commit()

    print("Seeding done!")
