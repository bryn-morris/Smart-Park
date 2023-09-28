"""added Websocket_room 1:1 relationship for managing websocket rooms

Revision ID: c71b34948b8d
Revises: f0b1c2ec7f85
Create Date: 2023-09-28 15:33:13.590785

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c71b34948b8d'
down_revision = 'f0b1c2ec7f85'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('websocketrooms',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('room_name', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_websocketrooms_user_id_users')),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('websocketrooms')
    # ### end Alembic commands ###