---
title: Emoji Search
currentVersion: '1.2.0'
versions:
  '1.0.0':
    date: '2024-11-21'
    changes:
      - 'Initial release'
      - 'Basic search functionality'
  '1.1.0':
    date: '2024-11-22'
    changes:
      - 'Copy confirmation button'
      - 'Better user prompting for retry'
  '1.1.1':
    date: '2024-11-23'
    changes:
      - 'Fixed copying on mobile (Safari and Chrome)'
  '1.2.0':
    date: '2024-12-26'
    changes:
      - 'Improved performance with OpenAI embeddings'
  '1.2.1':
    date: '2025-01-06'
    changes:
      - 'Auto-focusing on search box and typing during search'
  '2.0.0':
    date: '2025-01-10'
    changes:
      - 'Neural emoji search released'
  '2.1.0':
    date: '2025-01-14'
    changes:
      - 'Input highlighting upon search'
---

<!-- This link is the best that I can do simply. Not ideal, as it's not robust to changes, but I liked the idea of sticking to the Markdown vibe for the whole about page, so this is what we get. Overall: 7/10. -->
[<< Back to Emoji Search](https://tim0120.github.io/projects/emoji-search)

## About Emoji Search
Emoji Search is my search engine for emojis. I was motivated to make this by my inability to find emojis efficiently when using [existing](https://www.macrumors.com/how-to/search-for-emoji-iphone/) [methods](https://www.raycast.com/FezVrasta/emoji). I thought that semantic search would be a simple and fun way to make a useful tool, so I made this. This effort was made possible by the [rise of language models](https://ogshoggoth.com/lllll.png) making text embedding pretty good and relatively cheap. You can find my (sorta organized) code for this [here](https://github.com/tim0120/emoji-search).

## Updates
### v2.1.0: Input Highlighting
*Release Date: 2025-01-14*

Small UX improvement: search input is automatically highlighted after submitting a search, making it easier to immediately search for something else.

### v2.0.0: Neural emoji search
*Release Date: 2025-01-10*

v2 introduces neural emoji search! This technique uses synthetic data and a small MLP architecture to significantly improve the quality of emoji selections by the search engine. Real testimonials for v2 include: "wow Tim this is really great" and "this is the only app I use now."

#### Methods
The main contribution of this update is the neural search engine. The search is now "neural" because queries are now passed through an MLP that maps text embeddings to emoji distributions. Implemented as follows:
1. Synthetic data generation: I created a synthetic dataset of text embeddings and emoji distributions. For each emoji, I generated a set of descriptions for the emoji using [gpt-4o-mini](https://platform.openai.com/docs/models#gpt-4o-mini). Then, I generated a set of emojis that matched each description. After embedding each description, the data is of the mapping (description embedding, emoji distribution).
2. MLP trainig: I trained an MLP with 2 hidden layers to map the text embeddings to their respective emoji distributions. I also smoothed the distributions to prvent overfitting.
3. Evalution: I asked some friends and family and they generally gave good reviews. 😀 

#### Limitations
The engine still fails for a number of eye tests, e.g. it does not include the Georgian flag when queried with "Georgia" or a skateboard when queried with "skateboard." I am considering implementing more descriptions and distributions to make sure that "obvious"/simple searches do happen "as one might expect."

Emoji Search also suffers from having no formal or quantitative evaluation system. This is a problem for determining if the engine is improving or "good enough," as the current method for evaluation include eye tests from a variety of people. The training and test losses do give some signal for doing well on the synthetic dataset I generated, but I think that this is likely prone to overfitting.

#### Miscellany
I've enjoyed the progress I've made so far on this small project. In addition to the search engine itself, I'm proud of having made a nice UI/UX with a way to copy emojis with feedback for copying, auto-focusing the search bar, and creating a quick and (generally) reliable search pipeline.

Some things that I've learned include:
- Deploying a product takes lots of care and tedium. The infrastructure around getting an idea to fruition is non-trivial, and I am grateful for the many great tools that people before me have created that allow me to make something like this.
- Synthetic data can work quite well, although good embeddings do help quite a bit. I think that making one's own heads on top of models and generating small fine-tuning datasets for small-scale purposes is much more possible now than before.
- A user only cares about a product insofar as it working (and they generally don't care how you did it). I realized this as I shared Emoji Search with others, and I think that it's ok for me to enjoy and be proud of the idea and work that went behind something even if others (understandably) do not.

### v1.2.1: Auto-focus and Search UX
*Release Date: 2025-01-06*

Small quality-of-life improvements: the search box now auto-focuses when you load the page, and you can type while a search is in progress (though submitting is still blocked until the current search completes).

### v1.2.0: Embeddings Powered by OpenAI
*Release Date: 2024-12-26*

Emoji Search is now powered by OpenAI's [text-embedding-3-small](https://platform.openai.com/docs/guides/embeddings/)! This change was added to address latency issues with using HuggingFace's free inference endpoint, as well as the limited embedding capabilities of the [mixedbread-ai/mxbai-embed-large-v1 🍞](https://huggingface.co/mixedbread-ai/mxbai-embed-large-v1) model. 

### v1.1.1: Mobile Copying Fixed!
*Release Date: 2024-11-23*

Copying wasn't working on mobile, so had to create a hacky fix for it. #deprecatedmethodsmattertoo

### v1.1.0: Copy Confirmation and (Hopefully) Some Clarity
*Release Date: 2024-11-22*

A couple usability updates:
- Clicking (or tapping) any emoji (other than the search magnifying glass and the sun/moon toggle) will now show a small message that says "Emoji copied!" at the bottom of the screen (in addition to copying the emoji to the clipboard as already was done).
- The failure message (for when things go bad in the backend) is now (hopefully) clearer, as it prompts the user (in bold) to "**Please try resubmitting!**" Hoping that this reduces complaints and enables a little more agency in this world. \s

#### Miscellany
Changing version numbers by hand is fine..for now.

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
