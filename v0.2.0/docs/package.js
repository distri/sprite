(function(pkg) {
  // Expose a require for our package so scripts can access our modules
  window.require = Require.generateFor(pkg);
})({
  "source": {
    "LICENSE": {
      "path": "LICENSE",
      "mode": "100644",
      "content": "The MIT License (MIT)\n\nCopyright (c) 2013 distri\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "mode": "100644",
      "content": "sprite\n======\n\nSprites that can be drawn on an HTML5 canvas.\n",
      "type": "blob"
    },
    "main.coffee.md": {
      "path": "main.coffee.md",
      "mode": "100644",
      "content": "Sprite\n======\n\nThe Sprite class provides a way to load images for use in games.\n\nA sprite is a still 2d image.\n\nAn animation can be created from a collection of sprites.\n\nBy default, images are loaded asynchronously. A proxy object is\nreturned immediately. Even though it has a draw method it will not\ndraw anything to the screen until the image has been loaded.\n\n    LoaderProxy = ->\n      draw: ->\n      fill: ->\n      width: null\n      height: null\n      image: null\n\nCache loaded images\n\n    spriteCache = {}\n\n    Sprite = (image, sourceX, sourceY, width, height) ->\n      sourceX ||= 0\n      sourceY ||= 0\n      width ||= image.width\n      height ||= image.height\n\nDraw this sprite on the given canvas at the given position.\n\n      draw: (canvas, x, y) ->\n        if x.x?\n          {x, y} = x\n\n        canvas.drawImage(\n          image,\n          sourceX,\n          sourceY,\n          width,\n          height,\n          x,\n          y,\n          width,\n          height\n        )\n\nDraw this sprite on the given canvas tiled to the x, y,\nwidth, and height dimensions specified.\n\nRepeat options can be `repeat-x`, `repeat-y`, `no-repeat`, or `repeat`. Defaults to `repeat`\n\n      fill: (canvas, x, y, width, height, repeat=\"repeat\") ->\n        pattern = canvas.createPattern(image, repeat)\n        canvas.drawRect({x, y, width, height, color: pattern})\n\n      width: width\n      height: height\n      image: image\n\nLoads all sprites from a sprite sheet found in\nyour images directory, specified by the name passed in.\n\nReturns an array of sprite objects which will start out empty, but be filled\nonce the image has loaded.\n\n    Sprite.loadSheet = (name, tileWidth, tileHeight) ->\n      url = ResourceLoader.urlFor(\"images\", name)\n\n      sprites = []\n      image = new Image()\n\n      image.onload = ->\n        imgElement = this\n        (image.height / tileHeight).times (row) ->\n          (image.width / tileWidth).times (col) ->\n            sprites.push(Sprite(imgElement, col * tileWidth, row * tileHeight, tileWidth, tileHeight))\n\n      image.src = url\n\n      return sprites\n\nLoads a sprite from a given url.\nA second optional callback parameter may be passet wich is executeh once the\nimage is loaded. The sprite proxy data is passed to it as the only parameter.\n\n    Sprite.fromURL = Sprite.load = (url, loadedCallback) ->\n      if sprite = spriteCache[url]\n        loadedCallback?.defer(sprite)\n\n        return sprite\n\n      spriteCache[url] = proxy = LoaderProxy()\n      img = new Image()\n\n      img.onload = ->\n        Object.extend(proxy, Sprite(this))\n\n        loadedCallback?(proxy)\n\n      img.src = url\n\n      return proxy\n\nA sprite that draws nothing.\n\n    Sprite.EMPTY = Sprite.NONE = LoaderProxy()\n\n    module.exports = Sprite\n",
      "type": "blob"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "mode": "100644",
      "content": "version: \"0.2.0\"\n",
      "type": "blob"
    },
    "test/sprite.coffee": {
      "path": "test/sprite.coffee",
      "mode": "100644",
      "content": "Sprite = require \"../main\"\n\ndescribe \"Sprite\", ->\n  it \"should construct sprites\", ->\n    img = new Image\n\n    assert Sprite(img)\n",
      "type": "blob"
    }
  },
  "distribution": {
    "main": {
      "path": "main",
      "content": "(function() {\n  var LoaderProxy, Sprite, spriteCache;\n\n  LoaderProxy = function() {\n    return {\n      draw: function() {},\n      fill: function() {},\n      width: null,\n      height: null,\n      image: null\n    };\n  };\n\n  spriteCache = {};\n\n  Sprite = function(image, sourceX, sourceY, width, height) {\n    sourceX || (sourceX = 0);\n    sourceY || (sourceY = 0);\n    width || (width = image.width);\n    height || (height = image.height);\n    return {\n      draw: function(canvas, x, y) {\n        var _ref;\n        if (x.x != null) {\n          _ref = x, x = _ref.x, y = _ref.y;\n        }\n        return canvas.drawImage(image, sourceX, sourceY, width, height, x, y, width, height);\n      },\n      fill: function(canvas, x, y, width, height, repeat) {\n        var pattern;\n        if (repeat == null) {\n          repeat = \"repeat\";\n        }\n        pattern = canvas.createPattern(image, repeat);\n        return canvas.drawRect({\n          x: x,\n          y: y,\n          width: width,\n          height: height,\n          color: pattern\n        });\n      },\n      width: width,\n      height: height,\n      image: image\n    };\n  };\n\n  Sprite.loadSheet = function(name, tileWidth, tileHeight) {\n    var image, sprites, url;\n    url = ResourceLoader.urlFor(\"images\", name);\n    sprites = [];\n    image = new Image();\n    image.onload = function() {\n      var imgElement;\n      imgElement = this;\n      return (image.height / tileHeight).times(function(row) {\n        return (image.width / tileWidth).times(function(col) {\n          return sprites.push(Sprite(imgElement, col * tileWidth, row * tileHeight, tileWidth, tileHeight));\n        });\n      });\n    };\n    image.src = url;\n    return sprites;\n  };\n\n  Sprite.fromURL = Sprite.load = function(url, loadedCallback) {\n    var img, proxy, sprite;\n    if (sprite = spriteCache[url]) {\n      if (loadedCallback != null) {\n        loadedCallback.defer(sprite);\n      }\n      return sprite;\n    }\n    spriteCache[url] = proxy = LoaderProxy();\n    img = new Image();\n    img.onload = function() {\n      Object.extend(proxy, Sprite(this));\n      return typeof loadedCallback === \"function\" ? loadedCallback(proxy) : void 0;\n    };\n    img.src = url;\n    return proxy;\n  };\n\n  Sprite.EMPTY = Sprite.NONE = LoaderProxy();\n\n  module.exports = Sprite;\n\n}).call(this);\n\n//# sourceURL=main.coffee",
      "type": "blob"
    },
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"version\":\"0.2.0\"};",
      "type": "blob"
    },
    "test/sprite": {
      "path": "test/sprite",
      "content": "(function() {\n  var Sprite;\n\n  Sprite = require(\"../main\");\n\n  describe(\"Sprite\", function() {\n    return it(\"should construct sprites\", function() {\n      var img;\n      img = new Image;\n      return assert(Sprite(img));\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/sprite.coffee",
      "type": "blob"
    }
  },
  "progenitor": {
    "url": "http://strd6.github.io/editor/"
  },
  "version": "0.2.0",
  "entryPoint": "main",
  "repository": {
    "id": 14668729,
    "name": "sprite",
    "full_name": "distri/sprite",
    "owner": {
      "login": "distri",
      "id": 6005125,
      "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
      "gravatar_id": null,
      "url": "https://api.github.com/users/distri",
      "html_url": "https://github.com/distri",
      "followers_url": "https://api.github.com/users/distri/followers",
      "following_url": "https://api.github.com/users/distri/following{/other_user}",
      "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
      "organizations_url": "https://api.github.com/users/distri/orgs",
      "repos_url": "https://api.github.com/users/distri/repos",
      "events_url": "https://api.github.com/users/distri/events{/privacy}",
      "received_events_url": "https://api.github.com/users/distri/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/distri/sprite",
    "description": "Sprites that can be drawn on an HTML5 canvas.",
    "fork": false,
    "url": "https://api.github.com/repos/distri/sprite",
    "forks_url": "https://api.github.com/repos/distri/sprite/forks",
    "keys_url": "https://api.github.com/repos/distri/sprite/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/distri/sprite/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/distri/sprite/teams",
    "hooks_url": "https://api.github.com/repos/distri/sprite/hooks",
    "issue_events_url": "https://api.github.com/repos/distri/sprite/issues/events{/number}",
    "events_url": "https://api.github.com/repos/distri/sprite/events",
    "assignees_url": "https://api.github.com/repos/distri/sprite/assignees{/user}",
    "branches_url": "https://api.github.com/repos/distri/sprite/branches{/branch}",
    "tags_url": "https://api.github.com/repos/distri/sprite/tags",
    "blobs_url": "https://api.github.com/repos/distri/sprite/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/distri/sprite/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/distri/sprite/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/distri/sprite/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/distri/sprite/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/distri/sprite/languages",
    "stargazers_url": "https://api.github.com/repos/distri/sprite/stargazers",
    "contributors_url": "https://api.github.com/repos/distri/sprite/contributors",
    "subscribers_url": "https://api.github.com/repos/distri/sprite/subscribers",
    "subscription_url": "https://api.github.com/repos/distri/sprite/subscription",
    "commits_url": "https://api.github.com/repos/distri/sprite/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/distri/sprite/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/distri/sprite/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/distri/sprite/issues/comments/{number}",
    "contents_url": "https://api.github.com/repos/distri/sprite/contents/{+path}",
    "compare_url": "https://api.github.com/repos/distri/sprite/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/distri/sprite/merges",
    "archive_url": "https://api.github.com/repos/distri/sprite/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/distri/sprite/downloads",
    "issues_url": "https://api.github.com/repos/distri/sprite/issues{/number}",
    "pulls_url": "https://api.github.com/repos/distri/sprite/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/distri/sprite/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/distri/sprite/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/distri/sprite/labels{/name}",
    "releases_url": "https://api.github.com/repos/distri/sprite/releases{/id}",
    "created_at": "2013-11-24T20:34:55Z",
    "updated_at": "2013-11-24T20:51:46Z",
    "pushed_at": "2013-11-24T20:51:45Z",
    "git_url": "git://github.com/distri/sprite.git",
    "ssh_url": "git@github.com:distri/sprite.git",
    "clone_url": "https://github.com/distri/sprite.git",
    "svn_url": "https://github.com/distri/sprite",
    "homepage": null,
    "size": 148,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": null,
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "forks_count": 0,
    "mirror_url": null,
    "open_issues_count": 0,
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "master",
    "master_branch": "master",
    "permissions": {
      "admin": true,
      "push": true,
      "pull": true
    },
    "organization": {
      "login": "distri",
      "id": 6005125,
      "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
      "gravatar_id": null,
      "url": "https://api.github.com/users/distri",
      "html_url": "https://github.com/distri",
      "followers_url": "https://api.github.com/users/distri/followers",
      "following_url": "https://api.github.com/users/distri/following{/other_user}",
      "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
      "organizations_url": "https://api.github.com/users/distri/orgs",
      "repos_url": "https://api.github.com/users/distri/repos",
      "events_url": "https://api.github.com/users/distri/events{/privacy}",
      "received_events_url": "https://api.github.com/users/distri/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "network_count": 0,
    "subscribers_count": 1,
    "branch": "v0.2.0",
    "defaultBranch": "master"
  },
  "dependencies": {}
});