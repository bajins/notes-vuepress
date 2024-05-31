// https://www.cnblogs.com/mkckr0/p/17714374.html
// https://gist.github.com/mkckr0/97ec5b0d99feede4c19ee6f905d5e722

val repoMirrorMap = mapOf(
    "https://repo.maven.apache.org/maven2" to "https://maven.aliyun.com/repository/central",
    "https://dl.google.com/dl/android/maven2" to "https://maven.aliyun.com/repository/google",
    "https://plugins.gradle.org/m2" to "https://maven.aliyun.com/repository/gradle-plugin",
    "https://jcenter.bintray.com" to "https://maven.aliyun.com/repository/jcenter",
)
val repoReplaceMap = mapOf(
    "https://maven.google.com" to "https://dl.google.com/dl/android/maven2"
)

fun RepositoryHandler.setMirrors() {
    all {
        if (this is MavenArtifactRepository && !name.endsWith("Origin")) {
            val originName = name
            var originUrl = url.toString().trimEnd('/')

            // do replace
            repoReplaceMap[originUrl]?.let { newUrl ->
                originUrl = newUrl
                setUrl(originUrl)
            }

            // do mirror
            repoMirrorMap[originUrl]?.let { newUrl ->
                // replace into mirror repo
                setUrl(newUrl)
                // add origin repo to find missing jars
                artifactUrls(originUrl)
                // keep origin repo to find missing POM
                maven(originUrl) { name = "$originName Origin" }
            }
        }
    }
    printRepos()
}

fun RepositoryHandler.printRepos() {
    all {
        if (this is MavenArtifactRepository) {
            println("Maven Repo: name=\"$name\", url=$url, artifacts=${artifactUrls}")
        }
    }
}

settingsEvaluated {
    pluginManagement {
        repositories {
            setMirrors()
        }
    }
    dependencyResolutionManagement {
        @Suppress("UnstableApiUsage")
        repositories {
            setMirrors()
        }
    }
}

allprojects {
    buildscript {
        repositories {
            setMirrors()
        }
    }
    repositories {
        setMirrors()
    }
}