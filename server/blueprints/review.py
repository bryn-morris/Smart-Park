from flask import Blueprint, make_response, request, session
from flask_restful import Resource

from config import api, app, db
from models import (
    Review,
    Dog_Park,
    Favorited
)

review_routes = Blueprint('review_routes', __name__)

class Reviews(Resource):
    def get(self):
        reviews = [r.to_dict() for r in Review.query.all()]
        return make_response(reviews, 201)
    
api.add_resource(Reviews, '/reviews')

@app.route('/review_dog_park/<int:id>', methods = ['POST', 'PATCH', 'DELETE', 'GET'])
def add_review_and_patch_dog_park_rating(id):
    
    # import ipdb;ipdb.set_trace()

    data = request.get_json()
    
    if request.method in ['POST', 'PATCH']:
        new_rating = float(data['rating'])
        
           
    if request.method in ['PATCH', 'DELETE']:
        try:
            sel_review = Review.query.filter(Review.id == data['id']).one()   
        except:
            return make_response({'message': 'Review not found in database!'}, 404)    

    if request.method == 'POST':
       
        ## Shouldn't ever be tripped, but leaving in for redundancy
        if Review.query.filter(db.and_(session['user_id'] == Review.user_id, id == Review.dog_park_id)).first():
            return make_response({'error':'duplicate record'}, 409)

        rating_list = [rev.rating for rev in Review.query.filter(Review.dog_park_id == id)]

        try:

            new_review = Review(
                comment = data['comment'],
                rating = new_rating,
                dog_park_id = id,
                user_id = data['user_id']
            )

            db.session.add(new_review)
            db.session.commit()
            ## Patch the DogPark Rating in the DB
            specific_dog_park = Dog_Park.query.filter(Dog_Park.id == id).one()
            specific_dog_park.rating = sum(rating_list, new_rating)/(len(rating_list)+1)

        except:
            
            response_body = {'message': 'Hey you goober, enter between 1-5'}
            return make_response(response_body, 403)

        db.session.add(new_review)
        db.session.add(specific_dog_park)

        db.session.commit()

        response_body = {
            'updated_dog_park': specific_dog_park.to_dict(only = (
                    'id',
                    'name',
                    'amenities',
                    'address',
                    'rating',
                    'image',
                    'reviews.id',
                    'reviews.comment',
                    'reviews.rating',
                    'reviews.user.username',
                    'favorited',
            ))

            ## Need to pull dog park state out into context, and then update that state
            ## with the updated_dog_park
        }

        return make_response(response_body, 201)

    if request.method == 'PATCH':

        old_database_rating = sel_review.rating

        for attr in data:
                setattr(sel_review, attr, request.get_json()[attr])

        db.session.add(sel_review)
        db.session.commit()
    
        specific_dog_park = Dog_Park.query.filter(Dog_Park.id == id).one()

        if request.get_json()['rating'] != old_database_rating:

            ## if rating has changed, update rating of dog park,
            ## otherwise just return the dog park and we will see the changed
            ## comment through eachDogPark.reviews.map
            
            rating_list = [rev.rating for rev in Review.query.filter(Review.dog_park_id == id)]
            specific_dog_park.rating = sum(rating_list)/(len(rating_list))

            db.session.add (specific_dog_park)
            db.session.commit()

        response_body = {'updated_dog_park' : specific_dog_park.to_dict(only = (
                'id',
                'name',
                'amenities',
                'address',
                'rating',
                'image',
                'reviews.id',
                'reviews.comment',
                'reviews.rating',
                'reviews.user.username',
                'favorited',
            ))}
        
        return make_response(response_body, 200)

    if request.method == 'DELETE':

        db.session.delete(sel_review)
        db.session.commit()

        specific_dog_park = Dog_Park.query.filter(Dog_Park.id == id).one()

        updated_rating_list = [rev.rating for rev in Review.query.filter_by(dog_park_id = id)]

        # need to update dog park rating in db
        if updated_rating_list == []:
            specific_dog_park.rating = None
            ## may be an issue with line above with validation
            ## if so add line to validation to return none if value == None
            db.session.add(specific_dog_park)
            db.session.commit()

        response_body = {}

        if updated_rating_list != []:

            new_dp_avg_rating = sum(updated_rating_list)/len(updated_rating_list) if updated_rating_list else 0

            specific_dog_park.rating = new_dp_avg_rating
            
            db.session.add(specific_dog_park)
            db.session.commit()

            response_body = {'new_dp_avg_rating': new_dp_avg_rating}

        return make_response(response_body, 200)

@app.route('/favorite', methods = ['POST'])
def favorite():

    dog_park_id = request.get_json()['dog_park_id']
    user_id = request.get_json()['user_id']

    newFavoriteJoin = Favorited(
        dog_park_id = dog_park_id,
        user_id = user_id,
    )
    selected_dog_park = Dog_Park.query.filter(Dog_Park.id == dog_park_id).one()

    db.session.add(newFavoriteJoin)
    db.session.commit()

    return make_response(selected_dog_park.to_dict(
        only = (
            'id',
            'name',
            'amenities',
            'address',
            'rating',
            'image',
            'reviews.id',
            'reviews.comment',
            'reviews.rating',
            'reviews.user.username',
            'favorited',
        )
    ), 201)

@app.route('/favorite/<int:id>', methods = ['DELETE'])
def favorite_by_id(id):

    try:
        selected_entry = Favorited.query.filter(Favorited.id == id).one()
        selected_dog_park = selected_entry.dog_park
    except:
        return make_response({"message":"404 Entry not found!"}, 404)
    
    db.session.delete(selected_entry)
    db.session.commit()

    return make_response(selected_dog_park.to_dict(
        only = (
                'id',
                'name',
                'amenities',
                'address',
                'rating',
                'image',
                'reviews.id',
                'reviews.comment',
                'reviews.rating',
                'reviews.user.username',
                'favorited',
    ))
    , 200)