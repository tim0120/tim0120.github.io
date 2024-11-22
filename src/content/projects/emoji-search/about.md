---
title: Emoji Search
currentVersion: '1.0.0'
versions:
  '1.0.0':
    date: '2024-11-21'
    changes:
      - 'Initial release'
      - 'Basic search functionality'
---

[<< Back to Emoji Search](https://tim0120.github.io/projects/emoji-search)

## About Emoji Search
Emoji Search is my search engine for emojis. I was motivated to make this by my inability to find emojis efficiently when using [existing](https://www.macrumors.com/how-to/search-for-emoji-iphone/) [methods](https://www.raycast.com/FezVrasta/emoji). I thought that semantic search would be a simple and fun way to make a useful tool, so I made this. This effort was made possible by the [rise of language models](https://ogshoggoth.com/lllll.png) making text embedding pretty good and relatively cheap. You can find my (sorta organized) code for this [here](https://github.com/tim0120/emoji-search).

## Updates
<!-- ### v2.0.0: Neural emoji search -->
<!-- ### v1.1.0: Nice things, keyboard users rejoice -->
### v1.0.0: Text Embeddings and 🥚
*Release Date: 2024-11-21*

The first release of Emoji Search introduces the main functionality of the work: the ability to search for emojis that match arbitrary text queries. A little rough around the edges, but gets the job done. Was very fun (and painful) to get this going -- the Github Pages-Vercel-HuggingFace orchestration took more effort than expected. 😅

#### Method
The process for finding a set of emojis matching a text query is as follows:
1. Download emoji data dataset, consisting of emoji characters and corresponding descriptions, e.g., ("😀", "grinning face"). I got my data from [Open Emoji API](https://emoji-api.com/).
2. Find an embedding model. For my purposes, I chose [mixedbread-ai/mxbai-embed-large-v1 🍞](https://huggingface.co/mixedbread-ai/mxbai-embed-large-v1), because it was available on the [HuggingFace Inference API](https://huggingface.co/docs/api-inference/en/index) as a [warm model](https://huggingface.co/docs/api-inference/supported-models).
3. Embed each description from the dataset. This can be stored as a matrix of size `num_emojis x embed_size` (`num_emojis=1859, embed_size=1024`).
4. Given a text query, embed the query and take the dot product of this embedding with the embedding matrix. Take the emojis corresponding to the top k (`k=30`) highest dot products and return these as the response. Voilà!

#### Limitations
After a few uses of the search, you can probably get the gist of the utility and limitations of the tool. It seems that searching generally gets emojis in the right direction, but there are often unrelated emojis sneaking in there too. The reason behind this is that the method used for searching is quite basic. Using one embedding per emoji, unedited from the embedding model that I get it from, is a usable but pretty underdetermined way to search for emojis via similarity. I plan to improve the underlying algo soon. Stay tuned. 😁

One other limitation that I personally want to improve on is the lack of keybinds. (I love keybinds.)

Finally, I'm using Vercel and HuggingFace free tiers, so hopefully this keeps working (been generally great so far). 🤞

#### Miscellany
It was fun to add some small nice UI additions to the site, like the InteractiveEmoji component that does hover-scaling and clipboard-copying on click. Going to add a confirmation of the copy soon too. (Thanks to #feedback.)

Of the many artifacts of this work, a salient one is the curious case of the egg emoji 🥚. My users and I discovered that 🥚 is very ubiquitous among search results, coming up in many, many unrelated searches, e.g., "fingers crossed," "excel," "elusive," "Tokyo," and "anything but an egg." I would suspect an unnormalized 🥚 embedding vector, but the model's embeddings are normalized so the mystery remains unsolved for now...