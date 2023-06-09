"""added favorited model join table to db

Revision ID: e88d700cdc37
Revises: f5b9607f0480
Create Date: 2023-06-15 12:28:23.398344

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e88d700cdc37'
down_revision = 'f5b9607f0480'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('favorited',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('dog_park_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['dog_park_id'], ['dog_parks.id'], name=op.f('fk_favorited_dog_park_id_dog_parks')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_favorited_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('favorited')
    # ### end Alembic commands ###
