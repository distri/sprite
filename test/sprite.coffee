Sprite = require "../main"

describe "Sprite", ->
  it "should construct sprites", ->
    img = new Image

    assert Sprite(img)

  it "should construct from data urls", (done) ->
    assert Sprite.load(
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAAEgAAABIAEbJaz4AAAAJdnBBZwAAACAAAAAgAIf6nJ0AAACGSURBVEjH7ZTRDYAgDEQP46wdgSEcgdncpX6IpsGUi4HGH+8POLhHSQGYFNpbXugBRImkU+cwwfcHJOpQ49LnrmGClaYS3gACL91RAMGL9CkEfV2d2OnIQII21aGY3wtScwoAMfN2XMJ6QcwtpTHuADYA+azHTRHzH4jz6rlSTK3Br18AcABNHBto+dslMQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMS0wOC0yMFQxNDo1NjoxMi0wNzowMIGIK7sAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTEtMDgtMjBUMTQ6NTY6MTItMDc6MDDw1ZMHAAAAAElFTkSuQmCC",
      ->
        done()
    )
