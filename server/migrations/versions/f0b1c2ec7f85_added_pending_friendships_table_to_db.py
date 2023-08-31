"""added pending friendships table  to db

Revision ID: f0b1c2ec7f85
Revises: 50a914a9b4dc
Create Date: 2023-08-31 09:33:26.999753

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f0b1c2ec7f85'
down_revision = '50a914a9b4dc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pending_friendships',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('pend_friend_1_id', sa.Integer(), nullable=True),
    sa.Column('pend_friend_2_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['pend_friend_1_id'], ['users.id'], name=op.f('fk_pending_friendships_pend_friend_1_id_users')),
    sa.ForeignKeyConstraint(['pend_friend_2_id'], ['users.id'], name=op.f('fk_pending_friendships_pend_friend_2_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('pending_friendships')
    # ### end Alembic commands ###
