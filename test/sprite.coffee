Sprite = require "../main"

describe "Sprite", ->
  it "should construct sprites", ->
    img = new Image

    assert Sprite(img)
